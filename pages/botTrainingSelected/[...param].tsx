import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { RootState } from "../../redux/rootReducer"
import {
  createBotTraining,
  editBotTraining,
  getBotTraining,
} from "../../redux/botTraining/actions"
import { BotTrainingsReducerPropsTypes } from "../../Utils/Types/botTrainingType"
import { connect } from "react-redux"
import { ServerStatus } from "../../Utils/Types/global"
import Loader from "../../components/Loader"
import AccessConsume from "../../wrappers/auth/AccessConsume"
import Layout from "../../components/Layout"
import Navigation from "../../components/Navigation"
import TagInput from "../../components/TagInput"
import TextFieldModalCrud, {
  TextFieldType,
} from "../../components/TextFieldModalCrud"
import AdditionalActionsInput from "../../components/AdditionalActionsInput"
import Button, { ButtonType } from "../../components/Button"
import styles from "./BotTrainingSelected.module.scss"

const mapStateToProps = (state: RootState) => {
  const botTrainingsReducer = state.botTraining
  return {
    botTraining: botTrainingsReducer.botTraining,
    botTrainingStatus: botTrainingsReducer.botTrainingStatus,

    botTrainingCreateStatus: botTrainingsReducer.botTrainingCreateStatus,
    botTrainingEditStatus: botTrainingsReducer.botTrainingEditStatus,
  }
}

const mapDispatchToProps = {
  getBotTraining,
  createBotTraining,
  editBotTraining,
}

export type BotTrainingPropType = {
  getBotTraining: Function
  createBotTraining: Function
  editBotTraining: Function
} & BotTrainingsReducerPropsTypes

export type dataFormType = {
  label: string
  name: string
  typeTextField: TextFieldType
  disabled: boolean
  type: string
  placeholder: string
  valueSelect?: string[]
  defaultValue?: any
}

export enum TypeAction {
  CREATE = "create",
  UPDATE = "update",
}

export enum TemplatesType {
  TAG_INPUT = "tagInput",
  ADDITIONAL_ACTIONS = "additional_actions",
  LABEL_INPUT = "label_input",
}

const typeMap: Record<string, TemplatesType> = {
  text: TemplatesType.LABEL_INPUT,
  number: TemplatesType.LABEL_INPUT,
  select: TemplatesType.LABEL_INPUT,
  textarea: TemplatesType.LABEL_INPUT,
}

const componentByChoice = {
  [TemplatesType.TAG_INPUT]: (props: any) => <TagInput {...props} />,
  [TemplatesType.LABEL_INPUT]: (props: any) => (
    <TextFieldModalCrud {...props} />
  ),
  [TemplatesType.ADDITIONAL_ACTIONS]: (props: any) => (
    <AdditionalActionsInput {...props} />
  ),
}

const BotTrainingSelected = ({
  getBotTraining,
  botTraining,
  botTrainingStatus,
  createBotTraining,
  editBotTraining,
  botTrainingCreateStatus,
  botTrainingEditStatus,
}: BotTrainingPropType) => {
  const [form, setForm] = useState<any>()
  const router = useRouter()
  const { param } = router.query

  useEffect(() => {
    if (param && param[0] === "update" && param[1]) {
      getBotTraining(param[1])
    }
  }, [param])

  useEffect(() => {
    if (botTraining && param && param[0] === "update" && param[1]) {
      setForm(botTraining)
    } else {
      const emptyForm = Object.fromEntries(
        createBotTrainingObject.map((item: any) => [item.name, ""])
      )
      setForm(emptyForm)
    }
  }, [botTraining])

  const handleChange = (fieldValue: {
    [key: string]: string | number | []
  }) => {
    setForm((prevForm: any) => ({ ...prevForm, ...fieldValue }))
  }

  const handleClick = (data: any) => {
    if (param && param[0] === TypeAction.CREATE) {
      createBotTraining(data)
    } else {
      editBotTraining(data)
    }
  }

  const handleClickCancel = () => {}

  const propsByType = (data: any) => {
    const baseType = typeMap[data.type] || data.type
    const value = {
      tagInput: {
        label: data.label,
        name: data.name,
        disabled: data.disabled,
        value: form[data.name] ? form[data.name] : [],
        onChange: handleChange,
        placeholder: data.placeholder,
      },
      label_input: {
        label: data.label,
        name: data.name,
        typeTextField: data.typeTextField,
        disabled: data.disabled,
        type: data.type,
        placeholder: data.placeholder,
        onChange: handleChange,
        valueInput: form[data.name] ? form[data.name] : "",
        valueSelect: data.valueSelect ? data.valueSelect : [],
        key: data.name,
      },
      additional_actions: {
        valueInput: form[data.name] ? form[data.name] : "",
        valueSelect: data.valueSelect ? data.valueSelect : [],
        onChange: handleChange,
        label: data.label,
        name: data.name,
        disabled: data.disabled,
        type: data.type,
        placeholder: data.placeholder,
        key: data.name,
      },
    }
    return componentByChoice[baseType](value[baseType])
  }

  const createBotTrainingObject = [
    {
      label: "Body",
      name: "body",
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: "textarea",
      placeholder: "Escriba cuerpo del mensaje",
    },
    {
      label: "Footer",
      name: "footer",
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: "text",
      placeholder: "Escriba pie del mensaje",
    },
    {
      label: "Seed",
      name: "seed",
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: "text",
      placeholder: "-",
    },
    {
      label: "Trigger",
      name: "trigger",
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: "text",
      placeholder: "-",
    },
    {
      label: "Type",
      name: "type",
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: "text",
      placeholder: "-",
    },
    {
      label: "Options",
      name: "options",
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: "tagInput",
      placeholder: "-",
    },
    {
      label: "Additional Actions",
      name: "additional_actions",
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: "additional_actions",
      placeholder: "-",
      valueSelect: [
        "reaction",
        "type",
        "sticker_name",
        "delay",
        "document_name",
        "text",
        "url",
      ],
    },
  ]

  return (
    <AccessConsume>
      <Layout>
        <section className={`${styles.botTrainingSelected}`}>
          <Navigation
            newRoute={"/botTraining"}
            title={"All botTrainings"}
          ></Navigation>
          <section className={`${styles.botTrainingSelectedContainer}`}>
            <>
              {/* {botTrainingStatus === ServerStatus.FETCH && botTraining && ( */}
              <div className={`${styles.botTrainingSelectedContainerData}`}>
                {createBotTrainingObject?.length !== 0 &&
                  form &&
                  Object.keys(form).length !== 0 && (
                    <form>
                      {createBotTrainingObject?.map((data) =>
                        propsByType(data)
                      )}
                      <section className={`${styles.containerButtonActions}`}>
                        <Button
                          value={"Cancel"}
                          onClick={() => handleClickCancel()}
                          type={ButtonType.SECONDARY}
                        ></Button>
                        <Button
                          value={
                            param && param[0] === TypeAction.CREATE
                              ? "Create"
                              : "Update"
                          }
                          onClick={() => handleClick(form)}
                          type={ButtonType.PRIMARY}
                        ></Button>
                      </section>
                    </form>
                  )}
              </div>
              {/* )} */}
              {/* {botTrainingStatus === ServerStatus.FETCHING && <Loader></Loader>} */}
            </>
          </section>
        </section>
      </Layout>
    </AccessConsume>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BotTrainingSelected)
