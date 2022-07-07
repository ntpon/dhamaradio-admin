import React from "react"
import ContactForm from "../../../components/contact/contact-form"
import PageLayout from "../../../components/layout/page-layout"
import PriestForm from "../../../components/priest/priest-form"
import RoleForm from "../../../components/role/role-form"

function MemberEdit() {
  return (
    <PageLayout titleText='แสดงข้อมูล'>
      <ContactForm typeForm='show' />
    </PageLayout>
  )
}

export default MemberEdit
