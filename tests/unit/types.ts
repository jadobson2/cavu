import { Wrapper } from '@vue/test-utils'
import Vue from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RelaxedVue = Vue & { [key: string]: any }
export type RelaxedWrapper = Wrapper<RelaxedVue, Element>
