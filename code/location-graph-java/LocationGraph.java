import java.util.*;

public class LocationGraph {
    private Map<String, Vertex> vertices;

    public LocationGraph() {
        vertices = new HashMap<>();
    }

    public boolean addLocation(String location) {
        if (vertices.containsKey(location)) return false;
        vertices.put(location, new Vertex(location));
        return true;
    }

    public boolean addDistance(String locationA, String locationB, Double distance) {
        if (!vertices.containsKey(locationA)) addLocation(locationA);
        if (!vertices.containsKey(locationB)) addLocation(locationB);

        Vertex a = vertices.get(locationA);
        Vertex b = vertices.get(locationB);

        for (Edge e : a.edges) {
            if (e.destination == b) return false;
        }

        a.edges.add(new Edge(distance, b));
        b.edges.add(new Edge(distance, a));
        return true;
    }

    public double findDistanceBreadthFirst(String locationA, String locationB) {
        if (!vertices.containsKey(locationA) || !vertices.containsKey(locationB)) return -1;
        Queue<Vertex> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        Map<String, Double> distances = new HashMap<>();

        queue.add(vertices.get(locationA));
        distances.put(locationA, 0.0);

        while (!queue.isEmpty()) {
            Vertex current = queue.poll();
            visited.add(current.name);

            for (Edge edge : current.edges) {
                if (!distances.containsKey(edge.destination.name)) {
                    distances.put(edge.destination.name, distances.get(current.name) + edge.weight);
                    queue.add(edge.destination);
                }
            }
        }

        return distances.getOrDefault(locationB, -1.0);
    }

    public double findDistanceDepthFirst(String locationA, String locationB) {
        Set<String> visited = new HashSet<>();
        return dfs(locationA, locationB, visited, 0.0);
    }

    private double dfs(String current, String target, Set<String> visited, double distance) {
        if (!vertices.containsKey(current) || !vertices.containsKey(target)) return -1;
        if (current.equals(target)) return distance;

        visited.add(current);
        Vertex vertex = vertices.get(current);

        for (Edge edge : vertex.edges) {
            if (!visited.contains(edge.destination.name)) {
                double result = dfs(edge.destination.name, target, visited, distance + edge.weight);
                if (result != -1) return result;
            }
        }

        return -1;
    }

    public boolean detectCycle() {
        Set<String> visited = new HashSet<>();
        for (String name : vertices.keySet()) {
            if (!visited.contains(name)) {
                if (hasCycle(name, null, visited)) return true;
            }
        }
        return false;
    }

    private boolean hasCycle(String current, String parent, Set<String> visited) {
        visited.add(current);
        for (Edge edge : vertices.get(current).edges) {
            String neighbor = edge.destination.name;
            if (!visited.contains(neighbor)) {
                if (hasCycle(neighbor, current, visited)) return true;
            } else if (!neighbor.equals(parent)) {
                return true;
            }
        }
        return false;
    }

    public double findMinimumPath(String start, String end) {
        if (!vertices.containsKey(start) || !vertices.containsKey(end)) return -1;

        Map<String, Double> distances = new HashMap<>();
        PriorityQueue<Map.Entry<String, Double>> pq = new PriorityQueue<>(Map.Entry.<String, Double>comparingByValue());

        for (String name : vertices.keySet()) {
            distances.put(name, Double.MAX_VALUE);
        }

        distances.put(start, 0.0);
        pq.add(new AbstractMap.SimpleEntry<>(start, 0.0));

        while (!pq.isEmpty()) {
            Map.Entry<String, Double> entry = pq.poll();
            String current = entry.getKey();
            double dist = entry.getValue();

            if (current.equals(end)) return dist;

            for (Edge edge : vertices.get(current).edges) {
                String neighbor = edge.destination.name;
                double newDist = dist + edge.weight;
                if (newDist < distances.get(neighbor)) {
                    distances.put(neighbor, newDist);
                    pq.add(new AbstractMap.SimpleEntry<>(neighbor, newDist));
                }
            }
        }

        return -1;
    }

    public String toString() {
        List<String> keys = new ArrayList<>(vertices.keySet());
        Collections.sort(keys);
        StringBuilder sb = new StringBuilder();

        for (String from : keys) {
            sb.append(from).append(": ");
            for (String to : keys) {
                if (from.equals(to)) {
                    sb.append("0 ");
                } else {
                    boolean found = false;
                    for (Edge edge : vertices.get(from).edges) {
                        if (edge.destination.name.equals(to)) {
                            sb.append(edge.weight).append(" ");
                            found = true;
                            break;
                        }
                    }
                    if (!found) sb.append("-1 ");
                }
            }
            sb.append("\n");
        }

        return sb.toString();
    }
}

