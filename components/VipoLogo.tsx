type VipoLogoPropsType = {
  width?: string
  classVipoLogo?: string
}
export const VipoLogo = ({
  width = '100%',
  classVipoLogo = '',
}: VipoLogoPropsType): JSX.Element => {
  return (
    <img
      src="/images/blue_360_360.svg"
      alt="logo"
      width={width}
      className={classVipoLogo}
    />
  )
}
