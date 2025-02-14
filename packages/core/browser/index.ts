import { createApp } from 'vue';
import urqlPlugin from '@urql/vue';

import { gqlClientOptions }  from '@cosmic/core/parts';
import { MComponent } from '@cosmic-module/core';
import { createContainer, TOKENS, type RouterServiceAPI } from './service/index';
import App from './app.vue';

import type { BootstrapOption } from '@cosmic/core/parts';

import MColor from './component/color/color.vue';
import MClolorWidget from './component/color/color-widget.vue';
import MTitle from './component/title/title.vue';
import MWidget from './component/widget/widget.vue';
import MStandardModal from './component/modal/standard-modal.vue';
import MDetailModal from './component/modal/detail-modal.vue';
import MStandard from './component/standard/standard.vue';


function bootstrap(option: BootstrapOption) {
    const app = createApp(App);

    // eslint-disable-next-line vue/component-definition-name-casing
    app.component('m-component', MComponent);
    // gql
    app.use(urqlPlugin, gqlClientOptions);

    // ioc container
    const container = createContainer({ defaultScope: 'Singleton' });

    const routerPlugin = container.get<RouterServiceAPI>(TOKENS.Router);
    app.use(routerPlugin.getRouterConfig());

    app.provide('container', container);

    app.mount(option.root);

}

export { bootstrap };

// export * as service from './service/index';
export * as urql from '@urql/vue';
export * as router from 'vue-router';
export { default as lodash } from 'lodash';
export { default as color } from 'color';

export { MColor, MTitle, MWidget, MStandardModal, MStandard, MDetailModal, MClolorWidget};

export * from './use';
export * as service from './service/index';