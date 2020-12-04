const dom = (function() {

    // #region [rgba(0,0,120,0.1)] --> 

    var exceptions = ['id', 'onclick'];
    const setExceptions = list => exceptions = list;

    var classExceptions = ['rail'];
    const setClassExceptions = list => classExceptions = list;

    const svgToData = svgItem => {
        let itemClass = svgItem.getAttribute('class');
        if (itemClass && classExceptions.some(e => e == itemClass)) return false;

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

    const dataToSvg = data => {

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

let svgItem = document.querySelector('svg #all');
let data = dom.svg.toData(svgItem);
console.log('%c data:', 'background: #ffcc00; color: #003300', data)