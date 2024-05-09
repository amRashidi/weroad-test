<template>
  <v-modal v-model="show" permanent>
    <AppNavigate title="Add Booking" divider>
      <template #action>
        <v-btn icon="close-square" dense @click="show = false" />
      </template>
    </AppNavigate>
    <form @submit.prevent="onSubmit">
      <v-stepper v-model:step="step" :steps="steps" class="h-[500px]">
        <template v-for="currentStep,i in items" :key="i">
          <div v-if="step === i" class="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
            <div v-for="{model, extend ,component, ...attrs} in currentStep" :key="attrs.name" :class="{'col-span-2':extend}">
              <component :is="component" v-model="item[model]" v-bind="attrs" :error="errors[model]" />
            </div>
          </div>
        </template>
        <template #action>
          <div class="flex gap-4">
            <v-btn v-if="showPrev" color="secondary" type="button" @click="handleBack">
              Previous
            </v-btn>
            <v-btn v-if="showNext" type="submit" color="primary">
              Next
            </v-btn>
            <v-btn v-if="showSubmit" type="button" color="primary" @click="sendBooking">
              Submit
            </v-btn>
          </div>
        </template>
      </v-stepper>
    </form>
  </v-modal>
</template>
<script lang="ts" setup>
import type { TravelResult } from '~/types/travels'
import { LazyVTextArea, LazyVTextField, LazyVSelect, BookingTravelForm } from '#components'
type Props = {
  item: TravelResult
  show: boolean
}
type Emits = {
  (e:'update:item', item: TravelResult): void
  (e:'update:show', show: boolean): void
  (e:'submit'): void
}
const genderItems = [
  'male',
  'female',
  'other'
]
const paymentTypes = [
  'credit',
  'transfer',
  'paypal',
  'revolut'
]
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const show = useVModel(props, 'show', emit)
const item = useVModel(props, 'item', emit)
const steps = [
  { key: 'book', icon: 'search', title: 'travel' },
  { key: 'customer', icon: 'user-tag', title: 'customer' },
  { key: 'payment', icon: 'wallet', title: 'payment' },
  { key: 'confirm', icon: 'ticket', title: 'confirm' }
]
const schema = [
  {},
  {
    name: requiredRule,
    email: emailRule,
    number: phoneRule,
    age: requiredRule,
    gender: requiredRule
  },
  {
    payment: requiredRule
  },
  {}
]
const validationSchema = computed(() => schema[step.value])

const step = ref(0)

const showPrev = computed(() => step.value > 0 && step.value <= 3)
const showNext = computed(() => step.value > 0 && step.value < 3)
const showSubmit = computed(() => step.value === 3)

const { handleSubmit, errors } = useForm<TravelResult>({
  initialValues: item.value,
  keepValuesOnUnmount: true,
  validationSchema
})

function selectTravel () {
  step.value += 1
}

const items = reactive([
  [

    { component: BookingTravelForm, model: 'travel', defaultName: props.item.travel, extend: true, onSelect: selectTravel }

  ],
  [
    { component: LazyVTextField, model: 'name', name: 'name', label: 'name' },
    { component: LazyVTextField, model: 'email', name: 'email', label: 'email' },
    { component: LazyVTextField, model: 'number', name: 'number', label: 'number', type: 'tel' },
    { component: LazyVTextField, model: 'age', name: 'age', label: 'age', type: 'number' },
    { component: LazyVSelect, model: 'gender', name: 'gender', label: 'gender', items: genderItems }
  ],
  [
    { component: LazyVSelect, model: 'payment', name: 'payment', label: 'payment', items: paymentTypes, extend: true },
    { component: LazyVTextArea, model: 'note', name: 'note', label: 'note', extend: true }
  ]
])

function handleBack () {
  step.value--
}

const onSubmit = handleSubmit(() => {
  step.value++
})

async function sendBooking () {
  await emit('submit')
  show.value = false
}
</script>
