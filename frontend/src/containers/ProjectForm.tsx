import * as React from 'react'
import { Formik, FormikActions } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import get from 'lodash/get'

import {
  ProjectT,
  ProjectInputT,
  ProjectFormikPropsT,
  CreateProjectPayload,
  UpdateProjectPayload,
} from '@/types/index.d'

import { validationSchema } from '@/models/Project'
const createProjectMutation = require('@/graphql/Mutation/createProject.graphql')
const updateProjectMutation = require('@/graphql/Mutation/updateProject.graphql')

type Props = {
  organizationId: number,
  onSucceeded: Function,
  title: string,
  component: Function,
  project?: ProjectT,
}

export default function ProjectForm (props: Props) {
  const {
    title,
    project,
    component: FormComponent,
  } = props

  const initialValues: ProjectInputT = {
    name: '',
    description: '',
    ...(project || {})
  }
  const [createProject] = useMutation<CreateProjectPayload, ProjectInputT>(createProjectMutation)
  const [updateProject] = useMutation<UpdateProjectPayload, ProjectInputT>(updateProjectMutation)

  const handleSubmit = async (
    values: ProjectInputT,
    actions: FormikActions<ProjectInputT>
  ) => {
    actions.setSubmitting(true)
    try {
      let res, id
      if (project.id) {
        id = project.id
        const variables = { ...values, id }
        res = await updateProject({ variables })
      } else {
        const variables = { ...values, orgId: props.organizationId }
        res = await createProject({ variables })
        id = get(res, 'data.createProject.id')
      }
      if (!res) { return }
      props.onSucceeded(id)
    } catch (err) {
      console.error(err)
      window.alert('Error ' + err.message)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      render={(props: ProjectFormikPropsT) => (
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