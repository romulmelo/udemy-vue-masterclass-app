<script setup lang="ts">
import { reactive } from "vue"

type Subscription = {
  email: string
  subscribe: boolean
}

const emit = defineEmits<{
  (
    e: "submit",
    { email, subscribe }: { email: string; subscribe: boolean }
  ): Subscription
}>()

const subscription = reactive<Subscription>({
  email: "",
  subscribe: true
})

const handleSubscribe = (): void => {
  emit("submit", {
    email: subscription.email,
    subscribe: subscription.subscribe
  })

  subscription.email = ""
}
</script>

<template>
  <div
    class="mx-auto flex w-full max-w-3xl flex-col justify-center rounded-2xl bg-white py-12 px-10 md:px-20 md:py-16"
  >
    <h1
      class="text-3xl font-extrabold leading-tight tracking-tight text-zinc-900 md:text-4xl"
      data-test="form-title"
    >
      Subscribe to our newsletter!
    </h1>
    <p
      class="pt-4 pb-8 tracking-tight text-zinc-500 md:text-lg"
      data-test="form-description"
    >
      We'll send you the best of our blog just once a month. We promise.
    </p>
    <form
      class="flex flex-col gap-5 sm:flex-row"
      @submit.prevent="handleSubscribe"
    >
      <div class="flex flex-1 flex-col">
        <input
          v-model="subscription.email"
          class="peer h-14 rounded bg-neutral-100 px-6 py-4 ring-zinc-600 ring-offset-2 ring-offset-slate-50 focus:outline-none focus:ring-2"
          type="email"
          placeholder="Enter e-mail"
          autofocus
        />
        <p
          class="invisible flex items-center gap-1 pt-2 font-light text-red-500 peer-invalid:visible"
          data-test="form-error"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Invalid email</span>
        </p>
      </div>
      <button
        :disabled="!subscription.email"
        class="h-14 rounded bg-red-400 px-6 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
      >
        Subscribe
      </button>
    </form>
  </div>
</template>
