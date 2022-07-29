import React, { Suspense } from 'react'
import {
	Redirect,
	Route
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../../routes'
import ErrorHandler from '../errorHandler/errorHandler'

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
)
const TheContent = () => {
	/* DO NOT REMOVE the commented code in this file, it use for dynamic menus load based on rights. */
	//const navItems = useSelector((state: any) => state.menuItems.sideMenu)
	//const authRoutes = navItems?.map((nav: any) => {
	//    return nav.to
	//})
	return (
		<main className="c-main">
			<CContainer fluid>
				<Suspense fallback={loading}>

					{routes.map((route: any, idx) => {
						// if (authRoutes?.some((nav: any) => (nav == route.path))) {
						return route.component && (
							<Route
								key={idx}
								path={route.path}
								render={props => (
									<CFade>
										<ErrorHandler>
											<route.component {...props} />
										</ErrorHandler>
									</CFade>
								)} />
						)
						// }
					})}
					{/*<Redirect from={`${process.env.PUBLIC_URL}/`} to={authRoutes.some((nav: any) => (nav == `${process.env.PUBLIC_URL}/campaign`)) ? `${process.env.PUBLIC_URL}/campaign` : `${process.env.PUBLIC_URL}/home`} />*/}
					<Redirect from={`${process.env.PUBLIC_URL}/`} to={`${process.env.PUBLIC_URL}/contactStrategy`} />
				</Suspense>
			</CContainer>
			{/*<div className="helptext">*/}
			{/*    <HelpText />*/}
			{/*    </div>*/}
		</main>
	)
}

export default React.memo(TheContent)
