<script lang="ts" setup>
import { ref } from 'vue';
import MTitle from '../title/title.vue';
import MColor from './color.vue';
import MStandard from '../standard/standard.vue';
import MStandardModal from '../modal/standard-modal.vue';
import MDetailModal from '../modal/detail-modal.vue';
import { usePropterty } from '../../use/use-property';
import { service } from '@cosmic/core/browser';

const content = ref(null);


const {
    isStandard,
    standard,
    standardList,
    isShowStandardModal,
    isShowDetailModal,
    detailTarget,
    standardTarget,

    cancelStandardModal,
    cancelDetailModal,
    selectStandard,
    openDetaileModal,
    openStandardModal,
    getDetailEdit,
    unRef,
} = usePropterty(service.TOKENS.FillStyle);

function text(standard) {
     console.log(standard);
}

</script>

<template>
    <div class="w-full">
        <div ref="content">
            <div
                v-if="!isStandard" 
            >
                <m-title title="颜色">
                    <div
                        class="flex justify-between items-center w-30"
                    >
                        <i-cosmic-sun />
                        <i-cosmic-grid-outline @click.stop="(event) => openStandardModal(event.currentTarget)" />
                    </div>
                </m-title>
                <m-color
                    :color-style="standard"
                />
            </div>
            <m-standard
                v-else
                classes="-v-bg-inapparent"
                :standard="standard"
                :can-edit="false"
                @click="(event) => openStandardModal(event.event.currentTarget)"
            >
                <!-- demo 样式 -->
                <template #prefix="data">
                    <div :class="[$style['demo'], 'flex']">
                        <div
                            :class="[$style['demo-item'], 'flex items-center align-center']"
                            :style="{backgroundColor: `rgba(${data.standard?.color?.r}, ${data.standard?.color?.g}, ${data.standard?.color?.b}, 1)`}"
                        >
                            <i-cosmic-question v-if="!standard?.color" />
                        </div>
                    </div>
                </template>
                <template #subfix>
                    <div
                        class="flex items-center w-40 justify-between"
                    >
                        <i-cosmic-more @click.stop="openDetaileModal(content, standard)" />
                        <i-cosmic-lock @click.stop="unRef" />
                    </div>
                </template>
            </m-standard>
        </div>
    </div>

    <m-standard-modal
        v-if="isShowStandardModal"
        title="文字规范"
        :standard-list="standardList"
        :target="standardTarget"
        @cancel="cancelStandardModal"
        @select="(event) => selectStandard(event.data)"
        @show-detail="(event) => openDetaileModal(event.target, event.data)"
    >
        <!-- demo 样式 -->
        <template #prefix="data">
            <div :class="[$style['demo'], 'flex']">
                <div
                    :class="[$style['demo-item'], 'flex items-center align-center']"
                    :style="{backgroundColor: `rgba(${data.standard.color.r}, ${data.standard?.color?.g}, ${data.standard?.color?.b}, 1)`}"
                    @mouseover="text(data)"
                >
                    <i-cosmic-question v-if="!data.standard?.color" />
                </div>
            </div>
        </template>
    </m-standard-modal>
    <m-detail-modal
        v-if="isShowDetailModal"
        title="文字规范"
        :target="detailTarget"
        :standard="getDetailEdit()"
        @cancel="cancelDetailModal"
        @ok="cancelDetailModal"
    >
        <div :class="$style['color-content']">
            <m-color :color-style="getDetailEdit()" />
        </div>
    </m-detail-modal>
</template>

<style module>
.color-content {
    composes: -v-py w-full md from global;
    max-height: 400px
}

.demo {
    width: 100%;
    height: 100%;
}

.demo-item {
    flex: 1;
    flex-shrink: 0;
    font-size: var(--font-sm)
}
</style>
