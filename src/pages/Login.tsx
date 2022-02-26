import React from 'react';
import { useMutation  } from '@apollo/client';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom'
import { LOGIN_MUTATION } from '../graphql/mutations'

interface LoginValues {
	email: string
	password: string
}

export default function Login() {
  const navigate = useNavigate()
  
  const [ login, { data } ] = useMutation(LOGIN_MUTATION)

	const loginValues: LoginValues = {
		email: "",
		password: "",
	}

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email address").required("Email Required"),
		password: Yup.string().max(20, "Must be 20 characters or less").required("Password Required"),
	})


  return (
    <div>
        <h2>Login</h2>
      <Formik 
        initialValues={loginValues}
        validationSchema={validationSchema}
        onSubmit={async (values, {setSubmitting}) => {
          setSubmitting(true)
          const response = await login({
            variables: values
          })
          localStorage.setItem("token", response.data.login.token)
          setSubmitting(false)
          navigate('/users')
          }  
        }
      >
        <Form>
          <Field name="email" type="text" placeholder="Email" />
          <ErrorMessage name="email" component={'div'} />
          <Field name="password" type="password" placeholder="password" />
          <ErrorMessage name="password" component={'div'} />
          <button type='submit'>Login</button>
        </Form>
      </Formik>
    </div>
  )
}
