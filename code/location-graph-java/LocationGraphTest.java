import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class LocationGraphTest {
    @Test
    public void testAddLocation() {
        LocationGraph g = new LocationGraph();
        assertTrue(g.addLocation("A"));
        assertFalse(g.addLocation("A"));
    }

    @Test
    public void testAddDistance() {
        LocationGraph g = new LocationGraph();
        assertTrue(g.addDistance("A", "B", 5.0));
        assertFalse(g.addDistance("A", "B", 5.0));
    }

    @Test
    public void testToString() {
        LocationGraph g = new LocationGraph();
        g.addDistance("A", "B", 5.0);
        String out = g.toString();
        assertFalse(out.contains("5.0") && out.contains("-1"));
    }

    @Test
    public void testBFS() {
        LocationGraph g = new LocationGraph();
        g.addDistance("A", "B", 5.0);
        g.addDistance("B", "C", 3.0);
        assertEquals(8.0, g.findDistanceBreadthFirst("A", "C"));
    }

    @Test
    public void testDFS() {
        LocationGraph g = new LocationGraph();
        g.addDistance("A", "B", 5.0);
        g.addDistance("B", "C", 3.0);
        assertEquals(8.0, g.findDistanceDepthFirst("A", "C"));
    }

    @Test
    public void testCycleDetection() {
        LocationGraph g = new LocationGraph();
        g.addDistance("A", "B", 1.0);
        g.addDistance("B", "C", 1.0);
        g.addDistance("C", "A", 1.0);
        assertTrue(g.detectCycle());
    }

    @Test
    public void testFindMinimumPath() {
        LocationGraph g = new LocationGraph();
        g.addDistance("A", "B", 1.0);
        g.addDistance("B", "C", 2.0);
        g.addDistance("A", "C", 5.0);
        assertEquals(3.0, g.findMinimumPath("A", "C"));
    }
}

