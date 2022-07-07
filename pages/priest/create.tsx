import React from "react"
import PageLayout from "../../components/layout/page-layout"
import PriestForm from "../../components/priest/priest-form"

function PriestCreate() {
  return (
    <PageLayout titleText='เพิ่มพระอาจารย์'>
      <PriestForm typeForm='create' />
    </PageLayout>
  )
}

export default PriestCreate
