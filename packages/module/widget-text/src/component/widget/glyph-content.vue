<script lang="ts" setup>
import { reactive } from 'vue';
import { Select, Row, Col, Input, RadioGroup, RadioButton } from 'cosmic-vue';
import { GlyphData, FontSize, FontWeight, FontType } from '../../data';
import type { TextStyle } from '@cosmic/core/parts';

const props = withDefaults(defineProps<{
    showLayout?: boolean,
    textStyle?: TextStyle,
}>(), {
    showLayout: true,
    textStyle: () => ({} as unknown as TextStyle),
});


const realStyle = reactive(props.textStyle);


</script>


<template>
    <div>
        <div :class="$style.row">
            <Select
                size="sm"
                :value="realStyle.fontName.fontFamily"
                @on-change="(event) => realStyle.fontName.fontFamily = event.value"
            >
                <SelectOption
                    v-for="data of GlyphData"
                    :key="data.value"
                    :value="data.value"
                    :label="data.label"
                />
            </Select>
        </div>
        <Row :class="$style.row">
            <Col :span="4">
                <div class="w-80">
                    <Select
                        size="sm"
                        :value="realStyle.fontSize"
                        allow-input
                        :class="$style['margin-left']"
                        @on-change="(event) => realStyle.fontSize = event.value"
                    >
                        <template #prefix>
                            <i-cosmic-font :class="$style.icon" />
                        </template>
                        <SelectOption
                            v-for="data of FontSize"
                            :key="data.value"
                            :value="data.value"
                            :label="data.label"
                        />
                    </Select>
                </div>
            </Col>
            <Col :span="4">
                <div class="w-80">
                    <Select
                        size="sm"
                        value="400"
                    >
                        <SelectOption
                            v-for="data of FontWeight"
                            :key="data.value"
                            :value="data.value"
                            :label="data.label"
                        />
                    </Select>
                </div>
            </Col>
            <Col :span="4">
                <div class="w-80">
                    <Select
                        size="sm"
                        value="12"
                    >
                        <SelectOption
                            v-for="data of FontType"
                            :key="data.value"
                            :value="data.value"
                            :label="data.label"
                        />
                    </Select>
                </div>
            </Col>
        </Row>
        <Row :class="$style.row">
            <Col :span="4">
                <div :class="[$style['glyph-item']]" class="w-80">
                    <Input
                        size="sm"
                        :value="realStyle.lineHeight.value"
                        @on-change="(event) => realStyle.lineHeight.value = event.value"
                    >
                        <template #prefix>
                            <i-cosmic-line-height :class="[$style.icon]" />
                        </template>
                    </Input>
                </div>
            </Col>
            <Col :span="4">
                <div :class="[$style['glyph-item']]" class="w-80">
                    <Select
                        size="sm"
                        :value="realStyle.letterSpacing.value"
                        allow-input
                        :class="$style['margin-left']"
                        @on-change="(event) => realStyle.letterSpacing.value = event.value"
                    >
                        <template #prefix>
                            <i-cosmic-font :class="[$style.icon]" />
                        </template>
                        <SelectOption
                            value="123"
                            label="1"
                        />
                        <SelectOption
                            value="2"
                            label="10"
                        />
                        <SelectOption
                            value="3"
                            label="20"
                        />
                    </Select>
                </div>
            </Col>
            <Col :span="4">
                <div class="w-80">
                    <Select
                        size="sm"
                        :value="realStyle.paragraphSpacing"
                        allow-input
                        @on-change="(event) => realStyle.paragraphSpacing = event.value"
                    >
                        <template #prefix>
                            <i-cosmic-vertical-height :class="[$style.icon]" />
                        </template>
                        <SelectOption
                            value="123"
                            label="1"
                        />
                        <SelectOption
                            value="2"
                            label="10"
                        />
                        <SelectOption
                            value="3"
                            label="20"
                        />
                    </Select>
                </div>
            </Col>
        </Row>
        <Row v-if="showlayout" :class="$style.row">
            <Col :span="16">
                <div :class="$style['radio-left']">
                    <RadioGroup value="1">
                        <RadioButton value="1">
                            <i-cosmic-text-left :class="$style['radio-icon']" />
                        </RadioButton>

                        <RadioButton value="2">
                            <i-cosmic-text-center :class="$style['radio-icon']" />
                        </RadioButton>

                        <RadioButton value="3">
                            <i-cosmic-text-right :class="$style['radio-icon']" />
                        </RadioButton>
                        <RadioButton value="4">
                            <i-cosmic-text-even :class="$style['radio-icon']" />
                        </RadioButton>
                    </RadioGroup>
                </div>
            </Col>
            <Col :span="8">
                <div>
                    <RadioGroup value="1">
                        <RadioButton value="1">
                            <i-cosmic-width-auto :class="$style['radio-icon']" />
                        </RadioButton>

                        <RadioButton value="2">
                            <i-cosmic-height-auto :class="$style['radio-icon']" />
                        </RadioButton>
                        <RadioButton value="3">
                            <i-cosmic-linked-square :class="$style['radio-icon']" />
                        </RadioButton>
                    </RadioGroup>
                </div>
            </Col>
        </Row>
    </div>
</template>

 <style module>
 .row {
    composes: mb-10 from global;
 }

 
 </style>