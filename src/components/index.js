
const requireCom = require.context('./', true, /\.vue$/);

const install = (Vue) => {
    if (install.installed) return;
    install.installed

    requireCom.keys().forEach(component => {
        const config = requireCom(component)

        Vue.component(config.default.name, config.default || config);
    });

}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

export default {
    install,
};

