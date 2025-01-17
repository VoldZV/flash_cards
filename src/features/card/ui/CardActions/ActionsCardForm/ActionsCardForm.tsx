import { ComponentPropsWithoutRef, useRef, useState } from 'react'

import { LoadPicture, Trash } from '@/common/assets/icons'
import { ButtonVariant } from '@/common/enums'
import { Button } from '@/common/ui/Button'
import { FileUploader } from '@/common/ui/FilesUploader'
import { IconButton } from '@/common/ui/IconButton'
import { ModalClose } from '@/common/ui/Modals/ModalClose'
import { Select } from '@/common/ui/Select'
import { ControlledTextField } from '@/common/ui_controlled/ControlledTextField'
import { CatchingData } from '@/common/utils/handleErrorResponse'
import { Card } from '@/features/card'
import cn from 'classnames'

import s from './ActionsCardForm.module.scss'

import { ActionsCardFormData, useActionsCardForm } from '../../../model/hooks/useActionsCardForm'

type Props = {
  card?: Card
  disabled: boolean
  onSubmit: (data: FormData) => Promise<CatchingData | undefined>
  submitTitle?: string
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

const options = [
  { title: 'Text', value: 'text' },
  { title: 'Image', value: 'image' },
]

export const ActionsCardForm = ({
  card,
  className,
  disabled,
  onSubmit,
  submitTitle = 'Add New Card',
}: Props) => {
  const {
    coverOptions: { answerCover, coverSchema, questionCover, setAnswerCover, setQuestionCover },
    formValues: {
      clearErrors,
      control,
      formState: { errors },
      handleSubmit,
      setError,
    },
  } = useActionsCardForm(card)

  const [selectQuestion, setSelectQuestion] = useState(options[0].value)
  const [selectAnswer, setSelectAnswer] = useState(options[0].value)

  const isDefaultQuestionCover = typeof questionCover === 'string'
  const isDefaultAnswerCover = typeof answerCover === 'string'

  if (errors.question?.message && selectQuestion === 'image') {
    setSelectQuestion(options[0].value)
  }
  if (errors.answer?.message && selectAnswer === 'image') {
    setSelectAnswer(options[0].value)
  }

  const handleCreateCard = (formValues: ActionsCardFormData) => {
    const formData = new FormData()

    formData.append('question', formValues.question)
    formData.append('answer', formValues.answer)
    !isDefaultQuestionCover && formData.append('questionImg', questionCover || '')
    !isDefaultAnswerCover && formData.append('answerImg', answerCover || '')

    onSubmit(formData).then(error => {
      if (error && error.fieldErrors) {
        error.fieldErrors?.forEach(el => {
          setError(el.field as keyof ActionsCardFormData, { message: el.message })
        })
      }
    })
  }
  const handleChangeSelectQuestion = (value: string) => {
    setSelectQuestion(value)
    clearErrors(['question'])
  }
  const handleChangeSelectAnswer = (value: string) => {
    setSelectAnswer(value)
    clearErrors(['answer'])
  }

  const answerFileRef = useRef<HTMLInputElement>(null)
  const questionFileRef = useRef<HTMLInputElement>(null)

  const handleClearQuestionCover = () => {
    setQuestionCover(null)
    if (questionFileRef.current) {
      questionFileRef.current.value = ''
    }
  }
  const handleClearAnswerCover = () => {
    setAnswerCover(null)
    if (answerFileRef.current) {
      answerFileRef.current.value = ''
    }
  }

  return (
    <form className={cn(s.form, className)} onSubmit={handleSubmit(handleCreateCard)}>
      <Select
        className={s.input}
        disabled={disabled}
        fullWidth
        label="Choose a question format"
        onValueChange={handleChangeSelectQuestion}
        options={options}
        value={selectQuestion}
      />
      {selectQuestion === 'text' ? (
        <ControlledTextField
          className={s.input}
          control={control}
          disabled={disabled}
          errorText={errors.question?.message}
          label="Question"
          name="question"
        />
      ) : (
        <div className={s.input}>
          {questionCover && (
            <div className={s.answerWrapper}>
              <img
                alt="question"
                className={s.image}
                src={isDefaultQuestionCover ? questionCover : URL.createObjectURL(questionCover)}
              />
              <IconButton
                className={s.clearCover}
                icon={<Trash />}
                onClick={handleClearQuestionCover}
                size={1.5}
                type="button"
              >
                clear
              </IconButton>
            </div>
          )}
          <FileUploader
            disabled={disabled}
            name="questionImg"
            ref={questionFileRef}
            setFile={setQuestionCover}
            trigger={
              <Button
                as="span"
                fullWidth
                startIcon={<LoadPicture />}
                variant={ButtonVariant.secondary}
              >
                Change cover
              </Button>
            }
            validationSchema={coverSchema}
          />
        </div>
      )}
      <Select
        className={s.input}
        disabled={disabled}
        fullWidth
        label="Choose a question format"
        onValueChange={handleChangeSelectAnswer}
        options={options}
        value={selectAnswer}
      />
      {selectAnswer === 'text' ? (
        <ControlledTextField
          className={s.input}
          control={control}
          disabled={disabled}
          errorText={errors.answer?.message}
          label="Answer"
          name="answer"
        />
      ) : (
        <div className={s.input}>
          {answerCover && (
            <div className={s.answerWrapper}>
              <img
                alt="answer"
                className={s.image}
                src={isDefaultAnswerCover ? answerCover : URL.createObjectURL(answerCover)}
              />
              <IconButton
                className={s.clearCover}
                icon={<Trash />}
                onClick={handleClearAnswerCover}
                size={1.5}
                type="button"
              >
                clear
              </IconButton>
            </div>
          )}
          <FileUploader
            disabled={disabled}
            name="answerImg"
            ref={answerFileRef}
            setFile={setAnswerCover}
            trigger={
              <Button
                as="span"
                fullWidth
                startIcon={<LoadPicture />}
                variant={ButtonVariant.secondary}
              >
                Change cover
              </Button>
            }
            validationSchema={coverSchema}
          />
        </div>
      )}
      <div className={s.buttons}>
        <ModalClose>
          <Button disabled={disabled} type="button" variant={ButtonVariant.secondary}>
            Cancel
          </Button>
        </ModalClose>
        <Button disabled={disabled} type="submit">
          {submitTitle}
        </Button>
      </div>
    </form>
  )
}
