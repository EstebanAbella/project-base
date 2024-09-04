type LogoPropsType = {
  srcLogo: string
  width?: string
  classLogo?: string
}

export const Logo = ({width = '100%', classLogo = '', srcLogo}: LogoPropsType): JSX.Element => {
  return (
    <img
      src={srcLogo}
      alt="logo"
      width={width}
      className={classLogo}
    />
  )
}
