document.addEventListener("DOMContentLoaded", init);

function init() {
    const script = document.getElementById('u35a38');
    const targetLink = script.dataset['href'] || 'https://www.google.com/';
    const originPath = getOriginPath(script.src);
    const userConfig = getUserConfig(script.src);

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = `${originPath}styles.css`;

    const element = document.createElement('div');
    element.className = 'u35a38';
    setPosition(element, userConfig['align'], userConfig['valign']);
    const winWidth = window.innerWidth;
    setSize(element, getMaxWidth(userConfig['width']), winWidth);
    element.innerHTML = getTemplate(targetLink, originPath);

    script.after(stylesheet);
    stylesheet.after(element);
    script.remove();

    window.addEventListener('resize', (event) => {
        const resizeWinWidth = event.target.innerWidth;
        setSize(element, getMaxWidth(userConfig['width']), resizeWinWidth);
    });

    const closeButton = document.querySelector('.u35a38-close-button');
    closeButton.onclick = () => {element.style.display = 'none';};
}

function getOriginPath(link) {
    const lastSymbol = link.indexOf('index.js');
    return link.slice(0, lastSymbol);
}

function setPosition(element, align, valign) {
    if (!align) align = 'right';
    if (!valign) valign = 'bottom';
    if (align === 'left' && valign === 'top') {
        element.style.top = '0';
        element.style.left = '0';
        return;
    }
    if (align === 'left' && valign === 'center') {
        element.style.top = '50%';
        element.style.left = '0';
        element.style.transform = 'translate(0, -50%)';
        return;
    }
    if (align === 'left' && valign === 'bottom') {
        element.style.bottom = '0';
        element.style.left = '0';
        return;
    }
    if (align === 'center' && valign === 'top') {
        element.style.top = '0';
        element.style.left = '50%';
        element.style.transform = 'translate(-50%, 0)';
        return;
    }
    if (align === 'center' && valign === 'center') {
        element.style.top = '50%';
        element.style.left = '50%';
        element.style.transform = 'translate(-50%, -50%)';
        return;
    }
    if (align === 'center' && valign === 'bottom') {
        element.style.left = '50%';
        element.style.bottom = '0';
        element.style.transform = 'translate(-50%, 0)';
        return;
    }
    if (align === 'right' && valign === 'top') {
        element.style.top = '0';
        element.style.right = '0';
        return;
    }
    if (align === 'right' && valign === 'center') {
        element.style.top = '50%';
        element.style.right = '0';
        element.style.transform = 'translate(0, -50%)';
        return;
    }
    element.style.right = '0';
    element.style.bottom = '0';
}

function setSize(element, width, winWidth) {
    const padding = 12;
    if (width + padding < winWidth) {
        const maxWidth = getMaxWidth(width - padding);
        element.style.maxWidth = `${maxWidth}px`;
        const fontSize = getFontSize(maxWidth);
        element.style.fontSize = `${fontSize}px`;
    } else {
        const maxWidth = getMaxWidth(winWidth - padding);
        element.style.maxWidth = `${maxWidth}px`;
        const fontSize = getFontSize(maxWidth);
        element.style.fontSize = `${fontSize}px`;
    }
}

function getUserConfig(link) {
    const config = {};
    const alignOptions = ['left', 'center', 'right'];
    const valignOptions = ['top', 'center', 'bottom'];
    const linkChips = link.split('?');
    if (linkChips[1]) {
        const linkParams = linkChips[1].split('&');
        linkParams.forEach((param) => {
            const {0: paramKey, 1: paramValue} = param.split('=');
            if (paramKey === 'width' && isFinite(+paramValue)) {
                config[paramKey] = +paramValue;
            } else if (paramKey === 'align' && alignOptions.includes(paramValue)) {
                config[paramKey] = paramValue;
            } else if (paramKey === 'valign' && valignOptions.includes(paramValue)) {
                config[paramKey] = paramValue;
            }
        });
    }
    return config;
}

function getMaxWidth(width) {
    const defaultWidth = 350;
    const minWidth = 200;
    const maxWidth = 800;
    if (!width) {
        return defaultWidth;
    }
    if (width < minWidth) {
        return minWidth;
    }
    if (width > maxWidth) {
        return maxWidth;
    }
    return width;
}

function getFontSize(width) {
    return Math.round(width / 28);
}

function getTemplate(targetLink, originPath) {
    return '' +
        '<div class="u35a38-close-button">x</div>' +
        '<a href="' + `${targetLink}` + '" target="_blank">' +
        '  <div class="u35a38-container">' +
        '    <div class="u35a38-content">' +
        '      <div class="u35a38-content-top">' +
        '        <img class="u35a38-logo" src="' + `${originPath}` + 'assets/logo.png">' +
        '        <div>' +
        '          <span class="u35a38-font-regular">Building&nbsp;an&nbsp;ethical&nbsp;workplace.</span><br>' +
        '          <span class="u35a38-font-bold">TOGETHER</span>' +
        '        </div>' +
        '      </div>' +
        '      <div class="u35a38-content-bottom">' +
        '        <img class="u35a38-arrow" src="' + `${originPath}` + 'assets/arrow.png">' +
        '        <div>' +
        '          <span class="u35a38-font-bold">Anonymously&nbsp;report</span>&nbsp;<!--' +
        '          --><span class="u35a38-font-regular">any&nbsp;incident&nbsp;or&nbsp;issue</span>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</a>';
}
