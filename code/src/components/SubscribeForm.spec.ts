import { mount } from "@vue/test-utils"

import SubscribeForm from "./SubscribeForm.vue"

describe("SubscribeForm", () => {
  test("should display a title", () => {
    const wrapper = mount(SubscribeForm)
    const title = wrapper.find('[data-test="form-title"]')

    expect(title.text()).toMatch("Subscribe to our newsletter!")
  })

  test("should display a description", () => {
    const wrapper = mount(SubscribeForm)
    const description = wrapper.find('[data-test="form-description"]')

    expect(description.text()).toMatch(
      "We'll send you the best of our blog just once a month. We promise."
    )
  })

  test("should display an input for email subscription", () => {
    const wrapper = mount(SubscribeForm)
    const input = wrapper.find('input[type="email"]')

    expect(input.exists()).toBe(true)
    expect(input.attributes("type")).toBe("email")
    expect(input.attributes("placeholder")).toBeTruthy()
    expect(input.attributes("autofocus")).toBeDefined()
  })

  test("should display a button to subscribe", () => {
    const wrapper = mount(SubscribeForm)
    const button = wrapper.find('button[type="submit"]')

    expect(button.exists()).toBe(true)
    expect(button.text()).toBe("Subscribe")
    expect(button.attributes("type")).toBe("submit")
  })

  test("should disabled button if input is empty", async () => {
    const wrapper = mount(SubscribeForm)
    const button = wrapper.find('button[type="submit"]')

    await wrapper.find('input[type="email"]').setValue("")

    expect(button.attributes("disabled")).toBe("true")
  })

  test("should display an error if email is invalid", async () => {
    const wrapper = mount(SubscribeForm)
    const input = wrapper.find<HTMLInputElement>("input[type='email']")
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/

    await input.setValue("invalid email")

    expect(input.element.value.match(regex)).toBeFalsy()
    expect(wrapper.find('[data-test="form-error"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="form-error"]').text()).toMatch(
      "Invalid email"
    )
  })

  test("should register email on submit", async () => {
    const wrapper = mount(SubscribeForm)
    const email = "name@mail.com"

    await wrapper.find("input[type=email]").setValue(email)

    await wrapper.find("form").trigger("submit.prevent")

    expect(wrapper.emitted("submit")?.[0][0]).toStrictEqual({
      email,
      subscribe: true
    })
  })

  test("should clear input after submit", async () => {
    const wrapper = mount(SubscribeForm)
    const email = "name@mail.com"

    await wrapper.find("input[type=email]").setValue(email)

    await wrapper.find("form").trigger("submit.prevent")

    expect(
      wrapper.find<HTMLInputElement>("input[type=email]").element.value
    ).toBe("")
  })
})
