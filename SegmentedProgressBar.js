class SegmentedProgressBar {
    constructor(selector, maxProgressValue, dimension = 'width') {
        if (!selector) throw new Error('Selector must be provided.');
        if (typeof maxProgressValue !== 'number' || maxProgressValue <= 0) {
            throw new Error('A valid max progress value must be provided.');
        }
        if (!['width', 'height'].includes(dimension)) {
            throw new Error('Dimension must be either "width" or "height".');
        }

        this.dimension = dimension;
        this.selector = selector;
        this.progressElements = document.querySelectorAll(selector);
        this.totalSegments = this.progressElements.length;

        if (this.totalSegments === 0) {
            throw new Error('No elements found for the provided selector.');
        }

        this.maxProgressValue = maxProgressValue;
    }

    updateProgress(currentProgress) {
        if (typeof currentProgress !== 'number' || currentProgress < 0) {
            throw new Error('Current progress must be a non-negative number.');
        }

        const progressPerSegment = this.maxProgressValue / this.totalSegments;

        this.progressElements.forEach((element, i) => {
            const minThreshold = i * progressPerSegment;
            const maxThreshold = (i + 1) * progressPerSegment;

            if (currentProgress >= maxThreshold) {
                element.style[this.dimension] = '100%';
            } else if (currentProgress > minThreshold && currentProgress < maxThreshold) {
                const percentageFilled = ((currentProgress - minThreshold) / progressPerSegment) * 100;
                element.style[this.dimension] = `${percentageFilled}%`;
            } else {
                element.style[this.dimension] = '0%';
            }
        });
    }
}

export default SegmentedProgressBar;