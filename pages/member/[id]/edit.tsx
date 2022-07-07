import React from "react"
import PageLayout from "../../../components/layout/page-layout"
import MemberForm from "../../../components/member/member-form"

function MemberEdit() {
  return (
    <PageLayout titleText='เพิ่มสมาชิก'>
      <MemberForm typeForm='update' />
    </PageLayout>
  )
}

export default MemberEdit
