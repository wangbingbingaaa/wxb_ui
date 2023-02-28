export function randomExtend (minNum, maxNum) {
    if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
    } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    }
}

export function debounce (delay, callback) {
    let lastTime

    return function () {
        clearTimeout(lastTime)

        const [that, args] = [this, arguments]

        lastTime = setTimeout(() => {
            callback.apply(that, args)
        }, delay)
    }
}

export function observerDomResize (dom, callback) {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

    const observer = new MutationObserver(callback)

    observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })

    return observer
}

export function getPointDistance (pointOne, pointTwo) {
    const minusX = Math.abs(pointOne[0] - pointTwo[0])

    const minusY = Math.abs(pointOne[1] - pointTwo[1])

    return Math.sqrt(minusX * minusX + minusY * minusY)
}

export function uuid (hasHyphen) {
    return (hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0
        const v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}



export function filterNonNumber (array) {
    return array.filter(n => typeof n === 'number')
}
export function deepClone (object) {
    var recursion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!object) return object;
    var parse = JSON.parse,
        stringify = JSON.stringify;
    if (!recursion) return parse(stringify(object));
    var clonedObj = object instanceof Array ? [] : {};

    if (object && (0, _typeof2["default"])(object) === 'object') {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                if (object[key] && (0, _typeof2["default"])(object[key]) === 'object') {
                    clonedObj[key] = deepClone(object[key], true);
                } else {
                    clonedObj[key] = object[key];
                }
            }
        }
    }

    return clonedObj;
}

export function deepMerge (target, merged) {
    for (var key in merged) {
        if (target[key] && typeof target[key] === 'object') {
            deepMerge(target[key], merged[key])

            continue
        }

        if (typeof merged[key] === 'object') {
            target[key] = deepClone(merged[key], true)

            continue
        }

        target[key] = merged[key]
    }

    return target
}

export function mulAdd (nums) {
    nums = filterNonNumber(nums)

    return nums.reduce((all, num) => all + num, 0)
}

export function mergeSameStackData (item, series) {
    const stack = item.stack

    if (!stack) return [...item.data]

    const stacks = series.filter(({ stack: s }) => s === stack)

    const index = stacks.findIndex(({ data: d }) => d === item.data)

    const datas = stacks.splice(0, index + 1).map(({ data }) => data)

    const dataLength = datas[0].length

    return new Array(dataLength)
        .fill(0)
        .map((foo, i) => mulAdd(datas.map(d => d[i])))
}

export function getTwoPointDistance (pointOne, pointTwo) {
    const minusX = Math.abs(pointOne[0] - pointTwo[0])

    const minusY = Math.abs(pointOne[1] - pointTwo[1])

    return Math.sqrt(minusX * minusX + minusY * minusY)
}

export function getLinearGradientColor (ctx, begin, end, color) {
    if (!ctx || !begin || !end || !color.length) return

    let colors = color

    typeof colors === 'string' && (colors = [color, color])

    const linearGradientColor = ctx.createLinearGradient(...begin, ...end)

    const colorGap = 1 / (colors.length - 1)

    colors.forEach((c, i) => linearGradientColor.addColorStop(colorGap * i, c))

    return linearGradientColor
}

export function getPolylineLength (points) {
    const lineSegments = new Array(points.length - 1)
        .fill(0)
        .map((foo, i) => [points[i], points[i + 1]])

    const lengths = lineSegments.map(item => getTwoPointDistance(...item))

    return mulAdd(lengths)
}

export function getPointToLineDistance (point, linePointOne, linePointTwo) {
    const a = getTwoPointDistance(point, linePointOne)
    const b = getTwoPointDistance(point, linePointTwo)
    const c = getTwoPointDistance(linePointOne, linePointTwo)

    return 0.5 * Math.sqrt((a + b + c) * (a + b - c) * (a + c - b) * (b + c - a)) / c
}

export function initNeedSeries (series, config, type) {
    series = series.filter(({ type: st }) => st === type)

    series = series.map(item => deepMerge(deepClone(config, true), item))

    return series.filter(({ show }) => show)
}

export function radianToAngle (radian) {
    return radian / Math.PI * 180
}