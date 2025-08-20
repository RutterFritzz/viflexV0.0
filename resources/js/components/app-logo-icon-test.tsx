import { SVGAttributes } from 'react';

interface AppLogoIconTestProps extends SVGAttributes<SVGElement> {
    textColor?: string;
    strokeColor?: string;
}

export default function AppLogoIconTest({
    strokeColor = 'var(--foreground)',
    textColor = 'var(--primary)',
    ...props
}: AppLogoIconTestProps) {
    return (
        <svg {...props} id="f" data-name="Logo1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 497.78 178.89">
            <text
                transform="translate(1.18 142.84)"
                style={{ fill: textColor, fontFamily: "Rubik", fontSize: "200px" }}>
                <tspan x="0" y="0">V</tspan>
                <tspan x="122.4" y="0">i</tspan>
                <tspan x="155.2" y="0">F</tspan>
                <tspan x="253.2" y="0">l</tspan>
                <tspan x="290.2" y="0">e</tspan>
            </text>
            <path d="M472.61,119.95c4.88,7.54,9.76,15.08,14.64,22.62-6.63.09-13.25.18-19.88.27-1.6-3.21-3.2-6.42-4.81-9.63,3.35-4.42,6.69-8.84,10.04-13.26Z"
                style={{ fill: textColor }}
            />
            <path d="M400.38,46.04h19.6c7.28,11.18,14.55,22.35,21.83,33.53l-8.36,13.4c-11.02-15.65-22.04-31.29-33.07-46.94Z"
                style={{ fill: textColor }}
            />
            <g>
                <path
                    d="M394.51,165.04c9.38-5.44,22.18-14.36,35.08-27.51,3.03-3.09,9.66-10.09,16.87-20.21,7.95-11.15,16.98-23.83,21.55-42.26,1.69-6.83,3.53-17.5,2.51-31.07"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 3 }}
                />
                <path
                    d="M398.6,174.85c17.07-10.35,32.38-23.36,40.79-32.07,6.77-7.01,12.66-14.59,12.66-14.59s2.2-2.83,4.21-5.63c9.33-12.99,20.66-40.11,21.55-42.26,0,0,3.89-12.51,1.57-25.8-.66-3.8-1.81-5.11-2.36-5.84-2.08-2.78-7.15-4.62-8.22-5.01"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 3 }}
                />
                <path
                    d="M417.73,134.19c8.49-7.88,18.74-19.11,26.73-33.41,5.61-10.03,9.48-20.46,10.19-22.38,2.62-7.12,3.92-10.68,4.68-14.37,1.95-9.55.99-15.79,5.18-18.71,2.06-1.44,4.5-1.46,6.01-1.34"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 3 }}
                />
                <line
                    x1="394.9" y1="134.59" x2="464.34" y2="135.02"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 3 }}
                />
                <path
                    d="M416.49,116.67c20.1-.07,40.2-.14,60.3-.2"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 3 }}
                />
                <path
                    d="M430.19,98.29c18.77-1.23,37.19-2.56,55.96-3.79"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 2 }}
                />
                <path
                    d="M443.75,77.85c16.79-.88,33.31-1.87,50.1-2.75"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 2 }}
                />
                <path
                    d="M449.47,58.26c15.5-1.13,30.16-2.2,45.65-3.33"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 2 }}
                />
                <path
                    d="M452.72,41.52c1.55.66,3.48,1.65,5.49,3.15,1.71,1.27,3.03,2.57,4.03,3.7"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 2 }}
                />
                <path
                    d="M466.25,31.79c.7,1.82,1.4,4.02,1.89,6.57.38,1.93.57,3.72.65,5.29"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 2 }}
                />
                <path
                    d="M487.43,38.76c-1.7.54-4.36,1.68-6.66,4.16-2.02,2.18-2.98,4.55-3.47,6.17"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 2 }}
                />
                <line
                    x1="383.42" y1="151.67" x2="449.28" y2="151.58"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 2 }}
                />
                <line
                    x1="382.29" y1="158.5" x2="442.58" y2="158.22"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 2 }}
                />
                <line
                    x1="435.14" y1="164.94" x2="382.47" y2="165.07"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 3 }}
                />
                <line
                    x1="387.06" y1="143.13" x2="424.1" y2="142.89"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 2 }}
                />
                <path
                    d="M382.74,162.32c0,2.07.84,4.06,2.37,5.46,9.01,8.27,18.27,8.4,22.29,8.53,14.55.47,25.97-8.6,41.24-24.09,9.31-9.43,20.73-21.01,30.74-40.59,6.99-13.68,25.65-51.71,9.93-70.13-4.43-5.19-9.39-8.19-15.51-9.19-4.45-.73-9.05-.32-13.16,1.52-2.11.94-4.18,2.27-5.98,4.14-6.93,7.2-2.99,15.32-7.68,31.41-2.85,9.75-7.17,16.32-13.7,26.23-5.95,9.03-10.09,15.31-17.71,21.88-2.26,1.95-9.86,9.1-18.94,15.8-8.16,6.02-9.21,9.31-10.41,11.45-2.98,5.32-3.46,13.23-3.47,17.59Z"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 3 }}
                />
                <path
                    d="M383.42,151.67c-4.97.2-10.15.31-15.52.28-5.6-.02-10.99-.18-16.15-.45v15.03c10.24-.49,20.48-.98,30.72-1.47"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 3 }}
                />
                <path
                    d="M351.33,164.83c-50.83.69-101.67,1.37-152.5,2.06-.31.23-.65.45-1.02.67-.61.35-1.18.6-1.69.78-60.39.08-120.78.15-181.18.23-1.46.84-3.31,1.68-5.5,2.12-2.82.57-5.24.29-7.03-.15-.14-4.15-.28-8.3-.42-12.45"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 3 }}
                />
                <path
                    d="M351.33,153.93c-50.83-.69-101.67-1.37-152.5-2.06-.31-.23-.65-.45-1.02-.67-.61-.35-1.18-.6-1.69-.78-60.39-.08-120.78-.15-181.18-.23-1.46-.84-3.31,1.68-5.5-2.12-2.82-.57-5.24-.29-7.03.15-.14,4.15-.28,8.3-.42,12.45"
                    style={{ fill: "none", stroke: strokeColor, strokeMiterlimit: 10, strokeWidth: 3 }}
                />
            </g>
        </svg>
    );
}