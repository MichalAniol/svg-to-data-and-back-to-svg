const dom = (function() {

    // #region [rgba(0,0,120,0.1)] --> 

    var exceptions = ['id'];

    const svgToData = svgItem => {
        let data = {
            t: svgItem.nodeName
        };

        for (let attribute of svgItem.attributes) {
            if (exceptions.some(e => e == attribute.name)) continue;
            if (typeof data.a == 'undefined') data.a = [];
            data.a.push(attribute);
        }

        if (svgItem.children.length > 0) {
            data.c = []
            for (let child of svgItem.children) {
                data.c.push(svgToData(child))
            }
        }

        return data;

        // console.log('%c svgItem :', 'background: #ffcc00; color: #003300', svgItem)
        // let children = svgItem.children;

        // console.log('%c attributes:', 'background: #ffcc00; color: #003300', attributes)

        // for (let child of children) {
        //     console.log('%c child:', 'background: #ffcc00; color: #003300', child)

        // }

    }

    // #endregion

    // #region [rgba(255,0,255,0.05)] --> URUCHOMIENIE MODUŁU

    return {
        svg: { toData: svgToData }
    }

    // #endregion
}())

let svgItem = document.querySelector('svg #all');
let data = dom.svg.toData(svgItem);
console.log('%c data:', 'background: #ffcc00; color: #003300', data)