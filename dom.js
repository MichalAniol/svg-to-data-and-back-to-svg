const dom = (function() {

    // #region [rgba(0,0,120,0.1)] --> 

    var exceptions = ['id', 'onclick'];
    const setExceptions = list => exceptions = list;

    var classExceptions = [];
    const setClassExceptions = list => classExceptions = list;

    const svgToData = svgItem => {
        if (classExceptions.some(e => svgItem.classList.contains(e))) return false;

        let data = {
            t: svgItem.nodeName
        };

        for (let attribute of svgItem.attributes) {
            if (exceptions.some(e => e == attribute.name)) continue;
            if (typeof data.a == 'undefined') data.a = {};
            data.a[attribute.name] = attribute.value;
        }

        if (svgItem.children.length > 0) {
            data.c = []
            for (let child of svgItem.children) {
                let dataFromChild = svgToData(child);
                if (dataFromChild) data.c.push(dataFromChild)
            }
        }

        return data;
    }

    const getSVGelem = type => document.createElementNS('http://www.w3.org/2000/svg', type);

    const dataToSvg = data => {
        let elem = getSVGelem(data.t);

        if (typeof data.a != 'undefined') {
            for (let key in data.a) {
                elem.setAttribute(key, data.a[key]);
            }
        }

        if (typeof data.c != 'undefined') {
            for (let c of data.c) {
                let child = dataToSvg(c);
                elem.append(child);
            }
        }

        return elem;
    }

    // #endregion

    // #region [rgba(255,0,255,0.05)] --> URUCHOMIENIE MODUŁU

    return {
        svg: {
            setExceptions: setExceptions,
            setClassExceptions: setClassExceptions,
            toData: svgToData,
            fromData: dataToSvg,
        }
    }

    // #endregion
}())

let svgItemOne = document.querySelector('svg #one');
let data = dom.svg.toData(svgItemOne);
console.log('%c data:', 'background: #ffcc00; color: #003300', data)

let newSvgItem = dom.svg.fromData(data);
let svgItemTwo = document.querySelector('svg #two');
svgItemTwo.append(newSvgItem);