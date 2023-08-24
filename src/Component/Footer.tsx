

export default function Footer() {
    return (
        <div className="pg-footer">
            <footer className="footer">
                <div className="footer-copyright">
                    <div className="footer-copyright-wrapper">
                        <p className="footer-copyright-text">
                            <a className="footer-copyright-link text-white" href="#" target="_self"> ©{(new Date()).getFullYear()} | Designed By: Aldo Ratmawan. </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}