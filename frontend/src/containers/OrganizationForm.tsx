import * as React from 'react'
import { Formik, FormikActions } from 'formik'
import { useMutation } from '@apollo/react-hooks';

import { validationSchema } from '@/models/Organization'
const createOrganizationMutation = require('@/graphql/Mutation/createOrganization.graphql')
const updateOrganizationMutation = require('@/graphql/Mutation/updateOrganization.graphql')

type Props = {
  title: string,
  organization?: OrganizationT,
  component: Function,
  onSucceeded: Function,
}

export default function OrganizationForm (props: Props) {
  const {
    title,
    organization,
    component: FormComponent,
  } = props

  const initialValues: OrganizationInputT = {
    name: '',
    description: '',
    ...(props.organization || {})
  }

  const [updateOrganization] = useMutation(updateOrganizationMutation)
  const [createOrganization] = useMutation(createOrganizationMutation)

  const handleSubmit = async (
    values: OrganizationInputT,
    actions: FormikActions<OrganizationInputT>
  ) => {
    actions.setSubmitting(true)
    try {
      if (organization) {
        const variables = { ...values, id: organization.id }
        await updateOrganization({ variables })
      } else {
        await createOrganization({ variables: values })
      }
      props.onSucceeded()
    } catch (err) { 
      console.error(err)
      window.alert('Error ' + err.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      render={(props: OrganizationFormikPropsT) => (
        <FormComponent
          title={title}
          onSubmit={props.handleSubmit}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          values={props.values}
          errors={props.errors}
          isSubmitting={props.isSubmitting}
        />
      )}
    />
  )
}