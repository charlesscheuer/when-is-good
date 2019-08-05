import React from 'react'

export default function Creds() {
  return (
    <div className="credits">
      <p className="credits_text">
        Made by{' '}
        <a
          href="https://twitter.com/karthikkalyan90"
          rel="noopener noreferrer"
          target="_blank"
        >
          Karthik
        </a>{' '}
        and{' '}
        <a
          href="https://www.charlesscheuer.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Charlie
        </a>
        .<br />
        {/*Uncomment for about page*/}
        {/* <a
          className="credits_about"
          href="https://sharp-hypatia-c3340c.netlify.com/"
        >
            About imfree.fyi
        </a> */}
      </p>
    </div>
  )
}
