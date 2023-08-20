import { TextField, Button, Stack } from "@mui/material"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

export default function MuiLoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  function onSubmit(data) {
    console.log(data)
  }
  console.log(errors)

  return (
    <>
      <form noValidate>
        <Stack margin={"auto"} spacing={2} width={400}>
          <h1>Login Form with material UI and react hook form</h1>
          <TextField
            placeholder="Enter email"
            label="Email"
            type="email"
            {...register("email", {
              required: "Email required",
              validate: (value) => {
                if (!value.match("@") || !value.match(".com")) {
                  return "Must contain @ and .com"
                }
              },
            })}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />
          <TextField
            placeholder="Enter password"
            label="Password"
            type="password"
            {...register("password", {
              required: "Password required",
              validate: (value) => {
                if (value.length < 10) {
                  return "Must contain 10 or more characters"
                }
                if (!value.match(/[a-z]/)) {
                  return "Must contain one lower case letter."
                }
              },
            })}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />

          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </>
  )
}
