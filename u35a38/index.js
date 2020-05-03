document.addEventListener("DOMContentLoaded", initWidget);

function initWidget() {
    const script = document.getElementById('u35a38');
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'u35a38/styles.css';
    const userConfig = getUserConfig(script.src);
    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = getAlignItems(userConfig['valign']);
    wrapper.style.justifyContent = getJustifyContent(userConfig['align']);
    wrapper.innerHTML = getWidgetTemplate(getMaxWidth(userConfig['width']), getFontSize(userConfig['width']));
    script.after(stylesheet);
    stylesheet.after(wrapper);
    script.remove();
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

function getAlignItems(valign) {
    if (valign === 'top') {
        return 'flex-start';
    }
    if (valign === 'bottom') {
        return 'flex-end';
    }
    return 'center';
}

function getJustifyContent(align) {
    if (align === 'left') {
        return 'flex-start'
    }
    if (align === 'right') {
        return 'flex-end';
    }
    return 'center';
}

function getMaxWidth(width) {
    const minWidth = 200;
    const maxWidth = 800;
    if (!width || width < minWidth) {
        return `${minWidth}px`;
    }
    if (width > maxWidth) {
        return `${maxWidth}px`;
    }
    return `${width}px`;
}

function getFontSize(width) {
    const fontSize = Math.round(width / 28);
    return `${fontSize}px`;
}

function getWidgetTemplate(maxWidth, fontSize) {
    return '' +
        '<div class="u35a38" style="max-width: ' + `${maxWidth}` + '">' +
        '  <div class="u35a38-container">' +
        '    <div class="u35a38-content" style="font-size: ' + `${fontSize}` + '">' +
        '      <div class="u35a38-content-top">' +
        '        <img class="u35a38-logo" src="u35a38/assets/logo.png">' +
        '        <div>' +
        '          <span class="u35a38-font-regular">Building&nbsp;an&nbsp;ethical&nbsp;workplace.</span><br>' +
        '          <span class="u35a38-font-bold">TOGETHER</span>' +
        '        </div>' +
        '      </div>' +
        '      <div class="u35a38-content-bottom">' +
        '        <img class="u35a38-arrow" src="u35a38/assets/arrow.png">' +
        '        <div>' +
        '          <span class="u35a38-font-bold">Anonymously&nbsp;report</span>&nbsp;<!--' +
        '          --><span class="u35a38-font-regular">any&nbsp;incident&nbsp;or&nbsp;issue</span>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';
}
