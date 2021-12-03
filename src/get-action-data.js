/**
 * Fetch the relevant data from GitHub
 *
 * @param {object} githubContext - The current issue or pull request data
 */
const ACCEPTED_EVENT_TYPES = new Set([
	'pull_request',
	'pull_request_target',
	'pull_request_review',
	'issues',
	'issue_comment'
]);

const getActionData = githubContext => {
	const {eventName, payload} = githubContext;
	if (!ACCEPTED_EVENT_TYPES.has(eventName)) {
		throw new Error(`Only pull requests, reviews, issues, or comments allowed. Received:\n${eventName}`);
	}

	const githubData = payload.issue || payload.pull_request

	return {
		nodeId: githubData.node_id,
		url: githubData.html_url
	};
};

module.exports = getActionData;
