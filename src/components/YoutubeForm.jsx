import React from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

export const YoutubeForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    trigger,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      )
      const data = await response.json()
      return {
        username: data.username,
        mail: data.email,
        channel: data.name,
        social: {
          twitter: "",
          facebook: "",
        },
        phoneNumbers: ["", ""],
        phNumbers: [{ number: "" }],
        age: 0,
        dob: new Date(),
      }
    },
    mode: "all",
  })
  const date = new Date()
  console.log(date)

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  const onError = (errors) => {
    console.log("Form errors: ", errors)
  }

  const watchUsername = watch("username")

  const handleGetValues = () => {
    console.log("Get Values: ", getValues())
  }
  const handleSetValue = () => {
    setValue("username", "")
    setValue("mail", "")
  }
  return (
    <div>
      <h2>Username: {watchUsername}</h2>
      <form id="form" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required",
              validate: {},
            })}
          />
          <p className="error">{errors?.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="mail">E-mail</label>
          <input
            id="mail"
            type="email"
            {...register(
              "mail",
              {
                required: "Email is required.",
                validate: {
                  endsWith: (value) => {
                    if (!value.includes("@") || !value.includes(".")) {
                      return "Must include @ and ."
                    }
                  },
                  isAvailable: async (value) => {
                    const res = await fetch(
                      `https://jsonplaceholder.typicode.com/users?email=${value}`
                    )
                    const data = await res.json()
                    return data.length == 0 || "Email already exists"
                  },
                },
              }
              // {
              //   pattern: {
              //     value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              //     message: "Must contain @ and .com",
              //   },
              // },
            )}
          />
          <p className="error">{errors?.mail?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            id="channel"
            type="text"
            {...register("channel", { required: "Channel name is required" })}
          />
          <p className="error">{errors?.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            id="twitter"
            type="text"
            {...register("social.twitter", { required: "Twitter is required" })}
          />
          <p className="error">{errors?.social?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            id="facebook"
            type="text"
            {...register("social.facebook", {
              required: "Facebook is required",
            })}
          />
          <p className="error">{errors?.social?.facebook?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="primary-number">Primary phone number</label>
          <input
            id="primary-number"
            type="number"
            {...register("phoneNumbers.0")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="list-ph-numbers">List of phone numbers</label>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <input
                  className="ph-numbers"
                  type="number"
                  {...register(`phNumbers.${index}.number`)}
                />
                {index >= 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      remove(index)
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            )
          })}
          <button
            onClick={() => {
              append({ number: "" })
            }}
            type="button"
          >
            Add
          </button>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
              min: {
                value: 18,
                message: "Minimum is 18",
              },
              disabled: false,
            })}
          />
          <p className="error">{errors?.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            id="dob"
            type="date"
            {...register("dob", {
              required: "Date of birth is required",
              valueAsDate: true,
            })}
          />
          <p className="error">{errors?.dob?.message}</p>
        </div>

        <button disabled={!isDirty} type="submit">
          Submit
        </button>
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
        <button type="button" onClick={() => trigger("social.facebook")}>
          Validate
        </button>
      </form>

      <DevTool control={control} />
    </div>
  )
}
