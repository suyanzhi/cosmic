<script lang="ts" setup>
import { service } from '@cosmic/core/browser';
import { inject } from '@cosmic/core/parts';
const componentService = inject<service.ComponentService>(service.TOKENS.Component);
componentService.components.subscribe(next => {
    console.log('comp:', next[0]);
});
</script>
<template>
    <div class="flex">
        Component
    </div>
</template>
