import { mount, VueWrapper } from "@vue/test-utils"

import SubscribeForm from "./SubscribeForm.vue"

describe("SubscribeForm", () => {
  let sut: VueWrapper

  beforeEach(() => {
    sut = mount(SubscribeForm)
  })

  test("should display a title", () => {
    const title = sut.find('[data-test="form-title"]')

    expect(title.text()).toMatch("Subscribe to our newsletter!")
  })

  test("should display a description", () => {
    const description = sut.find('[data-test="form-description"]')

    expect(description.text()).toMatch(
      "We'll send you the best of our blog just once a month. We promise."
    )
  })

  test("should display an input for email subscription", () => {
    const input = sut.find('input[type="email"]')

    expect(input.exists()).toBe(true)
    expect(input.attributes("type")).toBe("email")
    expect(input.attributes("placeholder")).toBeTruthy()
    expect(input.attributes("autofocus")).toBeDefined()
  })

  test("should display a button to subscribe", () => {
    const button = sut.find('button[type="submit"]')

    expect(button.exists()).toBe(true)
    expect(button.text()).toBe("Subscribe")
    expect(button.attributes("type")).toBe("submit")
  })

  test("should disabled button if input is empty", async () => {
    const button = sut.find('button[type="submit"]')

    await sut.find('input[type="email"]').setValue("")

    expect(button.attributes("disabled")).toBe("true")
  })

  test("should display an error if email is invalid", async () => {
    const input = sut.find<HTMLInputElement>("input[type='email']")
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/

    await input.setValue("invalid email")

    expect(input.element.value.match(regex)).toBeFalsy()
    expect(sut.find('[data-test="form-error"]').exists()).toBe(true)
    expect(sut.find('[data-test="form-error"]').text()).toMatch("Invalid email")
  })

  test("should register email on submit", async () => {
    const email = "name@mail.com"

    await sut.find("input[type=email]").setValue(email)

    await sut.find("form").trigger("submit.prevent")

    expect(sut.emitted("submit")?.[0][0]).toStrictEqual({
      email,
      subscribe: true
    })
  })

  test("should clear input after submit", async () => {
    const email = "name@mail.com"

    await sut.find("input[type=email]").setValue(email)

    await sut.find("form").trigger("submit.prevent")

    expect(sut.find<HTMLInputElement>("input[type=email]").element.value).toBe(
      ""
    )
  })
})
