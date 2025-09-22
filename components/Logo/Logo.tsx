import Image from "next/image"

type LogoPropsType = {
  srcLogo: string
  width?: number
  height?: number
  classLogo?: string
}

export const Logo = ({
  width = 100,
  height = 100,
  classLogo = "",
  srcLogo,
}: LogoPropsType): JSX.Element => {
  return (
    <Image
      src={srcLogo}
      alt='logo'
      width={width}
      height={height}
      className={classLogo}
    />
  )
}
