import { Child1, Child2, Parent } from "../components/Parent";
import PromisePractice1 from "../components/sub-components/PromisePractice1";
import PromisePractice2 from "../components/sub-components/PromisePractice2";
import { Route, useNavigate } from "react-router-dom";
import PromisePracticeWithReducer from "../components/sub-components/PromisePracticeWithReducer";
import PromisePractice3 from "../components/sub-components/PromisePractice3";
import ContainerComponent from "../common/ContainerComponent";
import PromisePractice4 from "../components/sub-components/PromisePractice4";
import PromisePractice5 from "../components/sub-components/PromisePractice5";
import { DateComponent, DateRangeComponent, DateRangeComponentV2, DateRangeComponentV3 } from "../components/sub-components/MomentUsageBasicExamples";

export const routeConfig = [
    {
        path: "/",
        element: "Parent",
        children: [
            {
                path: "child1",
                element: "Child1",
                displayInCombo: true,
            },
            {
                path: "child2",
                element: "Child2",
                displayInCombo: true,
            },
            {
                path: "promise-practice1",
                element: "PromisePractice1",
                displayInCombo: true,
            },
            {
                path: "mypath",
                element: "NonExistingElement",
                displayInCombo: false,
            },
            {
                path: "promise-practice-with-reducer",
                element: "PromisePracticeWithReducer",
                displayInCombo: true,
            },
            {
                path: "promise-practice2",
                element: "PromisePractice2",
                displayInCombo: true,
            },
            {
                path: "promise-practice3",
                element: "PromisePractice3",
                displayInCombo: true,
            },
            {
                path: "container-component",
                element: "ContainerComponent",
                displayInCombo: true,
            },
            {
                path: "promise-practice4",
                element: "PromisePractice4",
                displayInCombo: true,
            },
            {
                path: "promise-practice5",
                element: "PromisePractice5",
                displayInCombo: true,
            },
            {
                path:"date-component",
                element:"DateComponent",
                displayInCombo: true,
            },
            {
                path:"date-range-component",
                element:"DateRangeComponent",
                displayInCombo: true,
            },
            {
                path:"date-range-component-v2",
                element:"DateRangeComponentV2",
                displayInCombo: true,
            },
            {
                path:"date-range-component-v3",
                element:"DateRangeComponentV3",
                displayInCombo: true,
            }
        ],
    },
    {
        path: "*",
        element: "NotFound",
        displayInCombo: false,
    },
];

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>404 Not Found</h1>
            <p>Oops! Page not found.</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

// Define a mapping from string to component
const componentMap = {
    Parent: Parent,
    Child1: Child1,
    Child2: Child2,
    PromisePractice1: PromisePractice1,
    PromisePracticeWithReducer: PromisePracticeWithReducer,
    PromisePractice2: PromisePractice2,
    PromisePractice3: PromisePractice3,
    PromisePractice4: PromisePractice4,
    PromisePractice5: PromisePractice5,
    ContainerComponent: () =>
        <>
            <ContainerComponent
                header={() => <p><b>Sample ContainerComponent</b> <br/>This is the header section.</p>}
                leftSection={() => <p>This is the left section.</p>}
                rightSection={() => <p>This is the right section.</p>}
                footer={() => <p>This is the footer section.</p>} />
        </>,
    NonExistingElement: () => <>I am the boss</>,
    DateComponent:DateComponent,
    DateRangeComponent: DateRangeComponent,
    DateRangeComponentV2: DateRangeComponentV2,
    DateRangeComponentV3: DateRangeComponentV3,
    NotFound: NotFound,
};

export const generateRoutes = (config = routeConfig) => {
    return config.map((route, index) => {
        const Element = componentMap[route.element];
        if (route.children) {
            return (
                <Route key={index} path={route.path} element={<Element />}>
                    {generateRoutes(route.children)}
                </Route>
            );
        }
        return <Route key={index} path={route.path} element={<Element />} />;
    });
};

/**
 * @param parentRouteName 
 *  
 * @returns childComponentNameObj having fields as :  "Child component display name": "route" 
 * 
 * Example:
 * 
    {
    "Child 1": "child1",
    "Child 2": "child2"
    } 
 *
 *  */
const getChildRouteNames = (parentRouteName = "/") => {
    let childComponentNameObj = {};
    if (parentRouteName) {
        const parentRoute = routeConfig.find((rc) => rc.path === parentRouteName);
        if (parentRoute && parentRoute.children) {
            childComponentNameObj = parentRoute.children
                .filter((ch) => ch.displayInCombo && ch.displayInCombo === true)
                .reduce((acc, rcc) => {
                    acc[rcc.element] = rcc.path;
                    return acc;
                }, {});
        }
    }
    // console.log(`${JSON.stringify(childComponentNameObj, null, 2)}`);
    return childComponentNameObj;
};

export const childComponentNames = getChildRouteNames();
