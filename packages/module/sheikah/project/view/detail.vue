<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { Dialog, Input } from 'cosmic-vue';
import { router as vueRouter } from '@cosmic/core/browser';
import Region from '../../common/component/region.vue';
import FileCard from '../component/file-card.vue';
import DirCard from '../component/dir-card.vue';
import { useProjects, useDrafts, useCreateDraft } from '../api';

const { useRoute } = vueRouter;

const { project, team } = useRoute().query as { project: string, team: string };

const { data, fetching } = useProjects({ parent: project });
const { data: draftData, fetching: draftFetching, executeQuery: refreshDrafts } = useDrafts({ project, team });
const { executeMutation: createDraft } = useCreateDraft();


const projects = ref<Partial<gql.Project>[]>([]);
const drafts = ref<Partial<gql.Draft>[]>([]);
const showDialog = ref(false);
const newDraftName = ref('');

watchEffect(() => {
    if (data.value && !fetching.value) {
        projects.value = data.value?.projects;
    }
    if (draftData.value && !draftFetching.value) {
        drafts.value = draftData.value?.drafts;
    }
});

function onSave() {
    if (newDraftName.value) {
        createDraft({
            data: {
                name: newDraftName.value,
                project,
                team,
            },
        }).then(res => {
            if (res.data) {
                refreshDrafts({ requestPolicy: 'network-only' });
            }
        });
    }
}

</script>

<template>
    <Region title="搜索通用组件" desc="修改时间">
        <template #bottom>
            <div class="flex justify-end">
                <div :class="$style.add" class="flex justify-center items-center" @click="showDialog = true">
                    <i-cosmic-plus class="text-md" />
                </div>
            </div>
        </template>
    </Region>
    <Region inverse>
        <div class="w-full" :class="$style['card-list']">
            <template v-for="project in projects" :key="project.id">
                <dir-card v-bind="project" />
            </template>
            <template v-for="draft in drafts" :key="draft.id">
                <file-card v-bind="draft" />
            </template>
        </div>
    </Region>
    <Dialog v-model:visible="showDialog" title="创建稿件" :show-close-icon="false" @ok="onSave">
        <div class="my-20">
            <Input v-model:value="newDraftName" placeholder="请输入名称" />
        </div>
    </Dialog>
</template>

<style module>
.card-list {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 24px;
    row-gap: 24px;
}
.add {
    height: 36px;
    width: 36px;
    border-radius: 4px;
    background: #f5f5f5;
}
@media (min-width: 960px) {
    .card-list {
        grid-template-columns: 1fr 1fr;
    }
}
@media (min-width: 1280px) {
    .card-list {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
@media (min-width: 1920px) {
    .card-list {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}
</style>

