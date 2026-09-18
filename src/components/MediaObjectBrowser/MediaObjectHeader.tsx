import React from 'react';

export interface MediaObjectHeaderProps {
    children: React.ReactNode;
}

export default function MediaObjectHeader({children}: MediaObjectHeaderProps) {
    return <header className="media-object-header">{children}</header>;
}
