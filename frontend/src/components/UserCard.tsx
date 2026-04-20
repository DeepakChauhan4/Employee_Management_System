/* eslint-disable @typescript-eslint/no-unused-expressions */
type User = {
    id: number | string;
    name: string;
    email: string;
    role: {
        name: string;
    };
    department?: { name: string } | null;
    profileImage?: string | null;
    createdAt?: string | null;
};

type Props = {
    user: User;
    isAdmin?: boolean;
    onDelete?: (id: number | string) => void;
    onEdit?: (user: User) => void;
    onView?: (id: number | string) => void;
};

export default function UserCard({ user, isAdmin, onDelete, onEdit, onView }: Props) {
    const avatar = user.profileImage ? `http://localhost:3000/uploads/${user.profileImage}` : null;
    const joined = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : null;

    return (
        <div
            style={{
                padding: "16px",
                borderRadius: "12px",
                background: "#fff",
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
                transition: "transform 0.12s, box-shadow 0.12s",
                cursor: onView ? 'pointer' : 'default',
                minHeight: 150,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(15,23,42,0.08)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(15,23,42,0.04)'; }}
            onClick={() => onView && onView(user.id)}
        >
            <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
                {avatar ? (
                    <img src={avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div style={{ width: 56, height: 56, borderRadius: 8, background: '#1976d2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{user.name?.charAt(0)?.toUpperCase()}</div>
                )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: user.role.name === 'ADMIN' ? '#e3f2fd' : '#e8f5e9', color: user.role.name === 'ADMIN' ? '#1976d2' : '#2e7d32', textAlign: 'center' }}>{user.role.name}</div>
                    </div>
                </div>

                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 6, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>

                <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' as const }}>
                    <div style={{ fontSize: 13, color: '#374151' }}>Department: <span style={{ color: '#6b7280', fontWeight: 600 }}>{user.department?.name ?? '—'}</span></div>
                    {joined && <div style={{ fontSize: 13, color: '#374151' }}>Joined: <span style={{ color: '#6b7280', fontWeight: 600 }}>{joined}</span></div>}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                {isAdmin && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit && onEdit(user); }}
                            style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#fbbf24', color: '#1f2937', cursor: 'pointer' }}
                        >
                            Edit
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete && onDelete(user.id); }}
                            style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer' }}
                        >
                            Delete
                        </button>
                    </div>
                )}

                <button
                    onClick={(e) => { e.stopPropagation(); onView && onView(user.id); }}
                    style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', color: '#111827', cursor: 'pointer' }}
                >
                    View
                </button>
            </div>
        </div>
    );
}
