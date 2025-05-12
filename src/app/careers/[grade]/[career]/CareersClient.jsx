"use client";

export default function CareersClient({ grade, career }) {
    return (
        <div>
            <h1>Careers for {grade}</h1>
            {career && <p>Selected career: {career}</p>}
        </div>
    );
}
