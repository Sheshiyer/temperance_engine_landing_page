export const pageCopy = {
  "navigation": {
    "skipLink": "Skip to product details",
    "systemLink": "The system",
    "workflowLink": "Workflow",
    "integrationsLink": "Integrations",
    "startLink": "See the setup steps"
  },
  "hero": {
    "eyebrow": "AI operator system",
    "headline": "From a coding request to a change you can check.",
    "subhead": "Temperance Engine packages project instructions, a seven-phase work loop, skill-cluster discovery and OmniRoute routing for model requests, set up around the coding clients you already use. You check the change against criteria you wrote down first.",
    "primaryCTA": "See the setup steps",
    "secondaryCTA": "Watch the 30-second tour",
    "note": "For developers and small teams working across AI coding clients such as OpenCode, Cursor, Claude Code or Codex."
  },
  "overview": {
    "eyebrow": "What Temperance adds",
    "headline": "Your client makes the change. Temperance sets up the steps around it.",
    "intro": "Much of a coding task happens before and after the edit: choosing context, finding a procedure, sending model requests and checking what came back. Temperance packages the parts for those steps: repository instructions, the work loop, skill-discovery hooks, routing configuration and an installer with a dry-run preview."
  },
  "film": {
    "eyebrow": "The system in 30 seconds",
    "headline": "See how the parts connect.",
    "intro": "A short visual tour of the context, skills, routing and checks described below.",
    "figcaption": "Temperance Engine · The architecture film",
    "transcriptLink": "Read the transcript ↗",
    "fallback": "Your browser does not support this video. Read the transcript below."
  },
  "workflow": {
    "eyebrow": "The work loop",
    "headline": "Follow one change through seven phases.",
    "intro": "The loop comes from PAI. Choose a phase to follow one example request, making a search component usable with a keyboard, from first look to a proposed lesson.",
    "exampleLabel": "Search example"
  },
  "koshas": {
    "eyebrow": "Five Koshas",
    "headline": "Five ways to look at the same task.",
    "intro": "The five Koshas, named from Sanskrit, are a way to sort the work: from the files you change to the context, decisions and purpose behind them. Choose a layer to see the question it helps you ask."
  },
  "organs": {
    "eyebrow": "Advisory organs",
    "headline": "Six named responsibilities around the loop.",
    "intro": "Each organ names one advisory responsibility: orientation, interpretation, learning, diagnosis, pattern review or improvement. Choose one to see the job it describes."
  },
  "integrations": {
    "eyebrow": "Build your own setup",
    "headline": "Choose the clients, skills and routing for your host.",
    "intro": "Start from the portable core and add the integrations that fit your work. Personal and company profiles are optional layers on top of it."
  },
  "getStarted": {
    "eyebrow": "Get started",
    "headline": "Try it on one project.",
    "intro": "Pick one repository and one coding client you already use. Preview what the installer would change, then add skills and integrations as you need them.",
    "guideHeading": "Start with the guide.",
    "guideBody": "The guide covers installation commands, routing setup, status checks and how to revert changes. Review the prerequisites for each integration you choose.",
    "primaryCTA": "Read the setup guide ↗",
    "secondaryCTA": "Explore on GitHub ↗",
    "previewEyebrow": "Preview your setup",
    "previewBody": "The dry run lists the proposed changes before anything is installed. Review that list, choose the modules you need and check their setup instructions."
  },
  "faq": {
    "eyebrow": "Questions",
    "headline": "Before you install.",
    "intro": "What exists today, what you need and where your data goes.",
    "compatibilityCTA": "Compatibility and requirements ↗"
  },
  "launch": {
    "eyebrow": "Follow the launch",
    "headline": "Check the work.\nTell us what you find.",
    "intro": "Try Temperance on one project, tell us what would improve your setup, and join the conversation on Product Hunt.",
    "badgeEyebrow": "Launching November 6",
    "badgeCTA": "Find us on Product Hunt"
  },
  "footer": {
    "attribution": "Temperance Engine · Made by Thoughtseed.",
    "githubCTA": "GitHub ↗"
  }
};

export const benefits = [
  {
    "id": "context",
    "name": "Keep the project brief in the repository.",
    "copy": "Write project instructions, goals and acceptance criteria into the repository. Configure each client you use to read them, and you can return to the same brief next week or from another client. Chat history stays in the client where it started."
  },
  {
    "id": "practice",
    "name": "Find a relevant skill for a scoped task.",
    "copy": "A skill is a written procedure, such as a keyboard-accessibility review, grouped with related skills in a cluster. A configured resolver helps you find one that fits. Where your client supports custom agents, a scoped implementer or reviewer can follow it for one part of the task, and its work gets checked like any other."
  },
  {
    "id": "progress",
    "name": "Know what to check before you call it done.",
    "copy": "The seven-phase loop runs from observing current behavior to proposing a lesson. Write the expected behavior and its checks into the plan, then compare the result with those criteria, not only with a finished run or a passing build."
  }
];

export const phases = [
  {
    "id": "observe",
    "name": "Observe",
    "sigil": "♄",
    "kosha": "manomaya",
    "headline": "Start with what exists.",
    "copy": "Read the request, the project instructions and the code it touches. Note what is known and what still needs an answer.",
    "detail": "Open the search component, read the project's accessibility criteria and try the search with a keyboard as it works today."
  },
  {
    "id": "think",
    "name": "Think",
    "sigil": "☿",
    "kosha": "vijnanamaya",
    "headline": "Compare approaches before choosing one.",
    "copy": "Look for a relevant procedure, compare approaches and name the main risk before you edit the code.",
    "detail": "Pick a keyboard-accessibility procedure, then compare moving focus into the results with keeping it in the input. Consider empty and changing results."
  },
  {
    "id": "plan",
    "name": "Plan",
    "sigil": "☉",
    "kosha": "vijnanamaya",
    "headline": "Write down the change and the checks.",
    "copy": "Turn the approach into a scoped task: the expected behavior, the files in scope and the checks that decide whether it worked. If you use GSD, the plan can live there.",
    "detail": "Define the focus order and what Escape does, limit the change to the search component, and list the keyboard and narrow-screen checks."
  },
  {
    "id": "build",
    "name": "Build",
    "sigil": "♃",
    "kosha": "annamaya",
    "headline": "Make a change small enough to review.",
    "copy": "A coding client makes the change, following the selected procedure; where supported, a scoped implementer agent can take this step. Keep the diff small and existing work intact.",
    "detail": "Implement the focus handling in a separate checkout, so the change is easy to inspect."
  },
  {
    "id": "execute",
    "name": "Execute",
    "sigil": "♂",
    "kosha": "pranamaya",
    "headline": "Run it and record what actually happened.",
    "copy": "Run the planned work with the tools you authorized. When a step calls a model through OmniRoute, the gateway routes that request; commands and tests run in your own tools. Record what ran and what it returned, failures included.",
    "detail": "Run the component tests and try the interaction in a browser. A failing focus test gets reported, not hidden."
  },
  {
    "id": "verify",
    "name": "Verify",
    "sigil": "♀",
    "kosha": "vijnanamaya",
    "headline": "Check the behavior against the goal.",
    "copy": "Compare the result with the plan's criteria, using checks suited to the change. A passing build answers one question; whether a keyboard user can finish a search answers another.",
    "detail": "Search by keyboard alone, on a narrow screen, while results change. Confirm focus stays visible and Escape returns to the input."
  },
  {
    "id": "learn",
    "name": "Learn",
    "sigil": "☽",
    "kosha": "anandamaya",
    "headline": "Propose a lesson, then review it.",
    "copy": "Note what helped and what surprised you, then draft a proposed change to a skill or project guidance. Review it yourself before you add it to shared practice.",
    "detail": "Draft a keyboard-search checklist for the accessibility skill, then review it before you save it."
  }
];

export const koshas = [
  {
    "id": "annamaya",
    "name": "Annamaya",
    "plain": "The things you build",
    "numeral": "I",
    "copy": "Files, configuration and other artifacts you can inspect, version and revert. For the search task: the component diff.",
    "question": "What changed?"
  },
  {
    "id": "pranamaya",
    "name": "Pranamaya",
    "plain": "The work in motion",
    "numeral": "II",
    "copy": "Commands, tool calls and routed model requests as they run, and what they returned. For the search task: the test run and browser session.",
    "question": "What happened?"
  },
  {
    "id": "manomaya",
    "name": "Manomaya",
    "plain": "The context you carry",
    "numeral": "III",
    "copy": "Project instructions, earlier observations and the facts you need to get oriented. For the search task: the current component and accessibility criteria.",
    "question": "What do we know?"
  },
  {
    "id": "vijnanamaya",
    "name": "Vijnanamaya",
    "plain": "The judgment you bring",
    "numeral": "IV",
    "copy": "The reasoning that turns information into decisions and then tests them. For the search task: choosing a focus pattern, scoping the change and judging the result.",
    "question": "Why this approach?"
  },
  {
    "id": "anandamaya",
    "name": "Anandamaya",
    "plain": "The purpose you return to",
    "numeral": "V",
    "copy": "The larger goal a task serves and the lessons worth keeping. For the search task: the checklist proposed for the accessibility skill.",
    "question": "What will we carry forward?"
  }
];

export const organs = [
  {
    "id": "vestibule",
    "name": "Vestibule",
    "role": "Get oriented.",
    "copy": "Orientation: turning the context you supply or select into a starting summary of where the work stands, what needs attention and which decision comes next."
  },
  {
    "id": "adytum",
    "name": "Adytum",
    "role": "Look more deeply.",
    "copy": "Interpretation: reading that context more closely and suggesting possible next actions, with a note of where each piece of information came from."
  },
  {
    "id": "nutrix",
    "name": "Nutrix",
    "role": "Tend the learning.",
    "copy": "Learning: finding lessons in task outcomes and drafting them as proposals for an owner to review."
  },
  {
    "id": "auspex",
    "name": "Auspex",
    "role": "Explain a health check.",
    "copy": "Diagnosis: explaining an infrastructure observation, such as a missing prerequisite or an unreachable route. Choosing a repair is a separate step."
  },
  {
    "id": "circulator",
    "name": "Circulator",
    "role": "Notice the pattern.",
    "copy": "Pattern review: looking across outcomes and lesson proposals in a scope you choose for themes a single session can miss."
  },
  {
    "id": "praeceptor",
    "name": "Praeceptor",
    "role": "Improve the practice.",
    "copy": "Improvement: suggesting a concrete change to a skill or workflow, such as adding the keyboard checklist to the accessibility skill, for its owner to accept or reject."
  }
];

export const integrations = [
  {
    "id": "clients",
    "name": "Your coding clients",
    "copy": "OpenCode and Cursor are the primary instruction surfaces; Claude Code and Codex are optional integrations. Clients differ in what they support, such as hooks or custom agents, so the same task can run differently in each. Chat sessions stay in the client where they started."
  },
  {
    "id": "capabilities",
    "name": "Skill clusters and custom agents",
    "copy": "Skills are written procedures grouped in indexed clusters. Supply a skill index from your own skill-clusters setup, then use the configured resolver and client to select and load procedures as needed. Clients that support custom agents can give a scoped writer, implementer or reviewer one part of a task; setup differs by client. CodeGraph adds structural code search where configured."
  },
  {
    "id": "routing",
    "name": "Model routing with OmniRoute",
    "copy": "Use phase-specific routing choices in OmniRoute, which manages provider credentials, models and fallback for model requests. PAI supplies the work loop; GSD is an optional planning backbone you can add."
  }
];

export const faqs = [
  {
    "question": "What can I use today?",
    "answer": "Release 0.8.0 includes the installer, guided onboarding and the routing integration. Check the compatibility notes for your host and client first. Experimental extensions are documented separately, so you can leave them out."
  },
  {
    "question": "Do I need a particular personal setup?",
    "answer": "No. Personal and company profiles are optional. You need a supported coding client plus the prerequisites of each integration you choose, such as an OmniRoute gateway for routing or a configured resolver for skill discovery. You do not need the founder's private projects, memory or company systems."
  },
  {
    "question": "Are all six organs included?",
    "answer": "The six names describe advisory responsibilities. A read-only Vestibule handler is available as a source preview; the five other portable adapters are planned. Source in the repository is not an installed or active service; the compatibility notes show what your setup includes."
  },
  {
    "question": "Where does my data go?",
    "answer": "If you choose a remote model route, those requests leave your machine for the providers you configure. Check the data flow and permissions of each integration before you enable it, and give each tool only the access it needs."
  }
];
