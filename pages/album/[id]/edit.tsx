import React from "react"
import AlbumForm from "../../../components/album/album-form"
import PageLayout from "../../../components/layout/page-layout"
import PriestForm from "../../../components/priest/priest-form"

function MemberEdit() {
  return (
    <PageLayout titleText='เพิ่มชุดเสียง'>
      <AlbumForm typeForm='update' />
    </PageLayout>
  )
}

export default MemberEdit
