import { NavLink, Outlet, useLoaderData, Form, redirect, useNavigation } from "react-router-dom";
import { getContacts, createContact } from "../contacts"

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts };
  }

export async function action(){
    const contacts = await createContact();
    return redirect(`/contacts/${contacts.id}/edit`);
}

export default function Root() {
    const { contacts } = useLoaderData();
    const navigation = useNavigation();
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input type="search" id="q" name="q" aria-label="Search contacts" placeholder="Search" />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink to={`contacts/${contact.id}`}>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail"
                className={navigation.state=="loading"?"loading":""}
            >
                <Outlet />
            </div>
        </>
    );
}