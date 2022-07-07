import { Box } from "@chakra-ui/react"
import React from "react"
import PageLayout from "../../components/layout/page-layout"
import MemberForm from "../../components/member/member-form"

function MemberCreate() {
  return (
    <PageLayout titleText='เพิ่มสมาชิก'>
      <MemberForm typeForm='create' />
    </PageLayout>
  )
}

export default MemberCreate
