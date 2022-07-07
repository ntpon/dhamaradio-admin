import React from "react"
import PageLayout from "../../../components/layout/page-layout"
import PriestForm from "../../../components/priest/priest-form"
import RoleForm from "../../../components/role/role-form"

function MemberEdit() {
  return (
    <PageLayout titleText='เพิ่มพระอาจารย์'>
      <RoleForm typeForm='update' />
    </PageLayout>
  )
}

export default MemberEdit
