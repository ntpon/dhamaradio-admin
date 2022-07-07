import React from "react"
import PageLayout from "../../../components/layout/page-layout"
import PriestForm from "../../../components/priest/priest-form"

function MemberEdit() {
  return (
    <PageLayout titleText='เพิ่มพระอาจารย์'>
      <PriestForm typeForm='update' />
    </PageLayout>
  )
}

export default MemberEdit
