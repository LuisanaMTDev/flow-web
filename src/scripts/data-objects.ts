import Alpine from "alpinejs"
import * as v from "valibot"
import axios from "axios"

  Alpine.data('authPanel', () => ({
    username: "",
    password: "",
    errors: {
      username: "",
      password: ""
  },
    openRegisterForm() {
      const registerFormDialog: HTMLDialogElement | null = document.querySelector("#register-form")

      if (registerFormDialog) {
        registerFormDialog.showModal()
      } 
    },
    closeRegisterForm() {
      this.errors = {
      username: "",
      password: ""
      }
      const registerFormDialog: HTMLDialogElement | null = document.querySelector("#register-form")

      const registerFormSchema = v.object({
          username: v.pipe(v.string(), v.trim(), v.maxLength(12, "Username can't be longer than 12 character"), v.minLength(5, "Username need to be longer than 5 character")),
          password: v.pipe(v.string(), v.trim(), v.minLength(8, "Password need to be longer than 8 character"))
        })

      const parseResult = v.safeParse(registerFormSchema, { username: this.username, password: this.password })

        if (registerFormDialog && parseResult.success) {
          registerFormDialog.close()

          axios.post("http://localhost:4322/register", {
            username: this.username,
            password: this.password
          }).then((response) => {
            console.log(response)
          }).catch((error) => {
            console.log(error)
          })
        }

        if (!parseResult.success) {
          this.errors.username = parseResult.issues[0].message
          this.errors.password = parseResult.issues[1].message
        }
      }
  }))
