import Head from "next/head"

type Props = {
  titleText?: string
  description?: string
  children?: React.ReactNode
}
const PageLayout = ({ titleText = "", description = "", children }: Props) => {
  return (
    <>
      <Head>
        <title>{titleText ? titleText + " | " : ""} RECALL REMEMBER</title>
        <meta
          name='description'
          content={description ? description : titleText}
        />
        <meta name='keywords' content={description ? description : titleText} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:image' content='/images/preview.png' />
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      </Head>
      {children}
    </>
  )
}
export default PageLayout
