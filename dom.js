const dom = (function() {

    // #region [rgba(0,0,120,0.1)] --> 

    const svgToData = (item, exceptions = [], classExceptions = []) => {

        if (classExceptions.some(e => item.classList.contains(e))) return false;

        let data = {
            t: item.nodeName
        };

        for (let attribute of item.attributes) {
            if (exceptions.some(e => e == attribute.name)) continue;
            if (typeof data.a == 'undefined') data.a = {};
            data.a[attribute.name] = attribute.value;
        }

        if (item.children.length > 0) {
            data.c = []
            for (let child of item.children) {
                let dataFromChild = svgToData(child, exceptions, classExceptions);
                if (dataFromChild) data.c.push(dataFromChild)
            }
        }

        return data;
    }

    const getSVGelem = type => document.createElementNS('http://www.w3.org/2000/svg', type);

    const dataToSvg = (data, exceptions = []) => {
        let elem = getSVGelem(data.t);

        if (typeof data.a != 'undefined') {
            for (let key in data.a) {
                if (exceptions.some(e => e == key)) continue;
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
            toData: svgToData,
            fromData: dataToSvg,
        }
    }

    // #endregion
}())

let svgItemOne = document.querySelector('svg #one');
let data = dom.svg.toData(svgItemOne, ['id', 'onclick'], ['arrow', 'no']);
console.log('%c data:', 'background: #ffcc00; color: #003300', data)

let newSvgItem = dom.svg.fromData(data);
let svgItemTwo = document.querySelector('svg #two');
svgItemTwo.append(newSvgItem);