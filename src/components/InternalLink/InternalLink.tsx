import React, {useCallback} from 'react';
import {WEB_LINKS} from 'services/features';
import useHistory from 'components/MediaBrowser/useHistory';
import './InternalLink.scss';

export interface InternalLinkProps {
    path: string;
    children: React.ReactNode;
    className?: string;
}

export default function InternalLink({path, className, children}: InternalLinkProps) {
    const {currentPath} = useHistory();

    return !WEB_LINKS || isSamePath(path, currentPath) ? (
        <span className={className}>{children}</span>
    ) : (
        <ActiveInternalLink className={className} path={path}>
            {children}
        </ActiveInternalLink>
    );
}

function ActiveInternalLink({path, className, children}: InternalLinkProps) {
    const {navigateTo} = useHistory();

    const handleClick = useCallback(() => {
        navigateTo(path);
    }, [navigateTo, path]);

    const handleMouseDown = useCallback((event: React.MouseEvent) => {
        if (event.button === 0) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, []);

    return (
        <a
            className={`internal-link ${className || ''}`}
            href={`#!/${path}`}
            tabIndex={-1}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
        >
            {children}
        </a>
    );
}

function isSamePath(path: string, currentPath: string): boolean {
    return path === currentPath || `pins/${path}` === currentPath;
}
