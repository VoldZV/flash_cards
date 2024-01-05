import { ComponentPropsWithoutRef } from 'react'

import { Edit, Trash } from '@/common/assets/icons'
import { TypographyVariant } from '@/common/enums'
import { Column, Sort } from '@/common/types'
import { IconButton } from '@/common/ui/IconButton'
import { Rating } from '@/common/ui/Rating'
import { Table } from '@/common/ui/Table'
import { Typography } from '@/common/ui/Typography'
import { Card } from '@/features/card'

import s from './CardsTable.module.scss'

type Props = {
  deckItems?: Card[]
  handleChangeSort: (sort: Sort) => void
  isOwner: boolean
  sort?: Sort
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const columns: Column[] = [
  {
    key: 'question',
    sortable: true,
    title: 'Question',
  },
  {
    key: 'answer',
    sortable: true,
    title: 'Answer',
  },
  {
    key: 'updated',
    sortable: true,
    title: 'Last Updated',
  },
  {
    key: 'grade',
    sortable: true,
    title: 'Grade',
  },
  {
    key: '',
    sortable: false,
    title: '',
  },
]

export const CardsTable = (props: Props) => {
  const { className, deckItems, handleChangeSort, isOwner, sort } = props

  return (
    <Table.Root className={className}>
      <Table.SortableHeader
        className={s.table}
        columns={columns}
        onSort={handleChangeSort}
        sort={sort}
      />
      <Table.Body>
        {deckItems?.map(el => {
          return (
            <Table.Row key={el.id}>
              <Table.Cell className={s.questionCell}>
                <Typography className={s.name} variant={TypographyVariant.body2}>
                  {el.questionImg && <img alt="cover" className={s.cover} src={el.questionImg} />}
                  {el.question}
                </Typography>
              </Table.Cell>
              <Table.Cell className={s.answerCell}>{el.answer}</Table.Cell>
              <Table.Cell className={s.updatedCell}>
                {new Date(el.updated).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell className={s.gradeCell}>
                <Rating rating={el.grade} />
              </Table.Cell>
              <Table.Cell className={s.actionsCell}>
                {isOwner && (
                  <>
                    <IconButton icon={<Edit />} />
                    <IconButton icon={<Trash />} />
                  </>
                )}
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}