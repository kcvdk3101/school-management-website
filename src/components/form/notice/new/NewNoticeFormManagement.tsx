import { yupResolver } from '@hookform/resolvers/yup'
import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAppDispatch } from '../../../../app/hooks'
import { addNewPost, getAllPosts } from '../../../../features/post/postSlice'
import { PostModel } from '../../../../models/post.model'
import NewNoticeForm from './NewNoticeForm'

type NewNoticeFormManagementProps = {
  handleCloseNoticeForm: () => void
}

type Input = {
  title: string
  content: string
}

const newNoticeSchema = yup.object({
  title: yup.string().trim().required('This field is required'),
  content: yup.string().trim().required('This field is required'),
})

const NewNoticeFormManagement: React.FC<NewNoticeFormManagementProps> = ({
  handleCloseNoticeForm,
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState } = useForm<Input>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(newNoticeSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    let newPost: PostModel[] = []
    newPost.push({
      title: data.title,
      content: data.content,
    })
    try {
      await dispatch(addNewPost(newPost))
      await dispatch(getAllPosts())
      toast.success(t('Add successfully!'))
    } catch (error) {
      toast.error('Cannot access this function')
    } finally {
      handleCloseNoticeForm()
    }
  })

  return (
    <>
      <DialogTitle>{t('Notice information')}</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <NewNoticeForm register={register} formState={formState} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoticeForm}>{t('Cancel')}</Button>
          <Button type='submit'>{t('Create')}</Button>
        </DialogActions>
      </form>
    </>
  )
}

export default NewNoticeFormManagement
